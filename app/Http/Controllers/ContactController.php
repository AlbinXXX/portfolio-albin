<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function show()
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|min:5|max:255',
            'message' => 'required|string|min:10|max:2000',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Log the attempt
        \Log::info('Contact form submission attempt', [
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'mail_config' => [
                'mailer' => config('mail.default'),
                'host' => config('mail.mailers.smtp.host'),
                'port' => config('mail.mailers.smtp.port'),
                'from' => config('mail.from.address'),
            ]
        ]);

        try {
            Mail::send('emails.contact', [
                'contactName' => $request->name,
                'contactEmail' => $request->email,
                'contactSubject' => $request->subject,
                'contactMessage' => $request->message,
            ], function ($message) use ($request) {
                $message->to(config('mail.from.address'))
                    ->subject('Portfolio Contact: ' . $request->subject)
                    ->replyTo($request->email, $request->name);
            });

            \Log::info('Contact form submission sent successfully', [
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject,
            ]);

            return redirect()->back()->with('success', 'Thank you for your message! I\'ll get back to you soon.');
        } catch (\Exception $e) {
            \Log::error('Contact form email sending failed', [
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject,
                'error_message' => $e->getMessage(),
                'error_file' => $e->getFile(),
                'error_line' => $e->getLine(),
                'mail_config' => [
                    'mailer' => config('mail.default'),
                    'host' => config('mail.mailers.smtp.host'),
                    'port' => config('mail.mailers.smtp.port'),
                    'username' => config('mail.mailers.smtp.username'),
                    'from' => config('mail.from.address'),
                ],
            ]);
            
            return redirect()->back()
                ->with('error', 'Sorry, there was an issue sending your message. Please try again or contact me directly.')
                ->withInput();
        }
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:test {--to=albin.rushiti2004@gmail.com}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email configuration by sending a test email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $to = $this->option('to');
        
        $this->info('Testing email configuration...');
        $this->info('MAIL_MAILER: ' . config('mail.default'));
        $this->info('MAIL_HOST: ' . config('mail.mailers.smtp.host'));
        $this->info('MAIL_PORT: ' . config('mail.mailers.smtp.port'));
        $this->info('MAIL_USERNAME: ' . config('mail.mailers.smtp.username'));
        $this->info('MAIL_FROM_ADDRESS: ' . config('mail.from.address'));
        
        try {
            Mail::raw('This is a test email from your Laravel application. If you receive this, your email configuration is working correctly!', function ($message) use ($to) {
                $message->to($to)
                    ->subject('Test Email - Portfolio Contact Form')
                    ->from(config('mail.from.address'), config('mail.from.name'));
            });
            
            $this->info("✅ Test email sent successfully to: {$to}");
            return 0;
            
        } catch (\Exception $e) {
            $this->error("❌ Failed to send test email: " . $e->getMessage());
            $this->error("Full error: " . $e->getTraceAsString());
            return 1;
        }
    }
}

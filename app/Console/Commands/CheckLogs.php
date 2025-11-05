<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CheckLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'logs:check {--lines=50}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check application logs for debugging';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $lines = $this->option('lines');
        
        $this->info('Recent application logs:');
        $this->line('==========================================');
        
        // In production, check stderr logs since Railway uses LOG_CHANNEL=stderr
        if (app()->environment('production')) {
            $this->info('Production environment - checking stderr logs');
            // On Railway, logs go to stderr/stdout
            $this->info('Check Railway dashboard logs for stderr output');
        } else {
            // Local development - check Laravel log file
            $logPath = storage_path('logs/laravel.log');
            if (file_exists($logPath)) {
                $this->info("Checking: {$logPath}");
                $this->line('==========================================');
                $output = shell_exec("tail -{$lines} {$logPath}");
                $this->line($output);
            } else {
                $this->warn('No log file found at: ' . $logPath);
            }
        }
        
        // Also show current mail configuration
        $this->line('==========================================');
        $this->info('Current Mail Configuration:');
        $this->table(['Setting', 'Value'], [
            ['MAIL_MAILER', config('mail.default')],
            ['MAIL_HOST', config('mail.mailers.smtp.host')],
            ['MAIL_PORT', config('mail.mailers.smtp.port')],
            ['MAIL_USERNAME', config('mail.mailers.smtp.username')],
            ['MAIL_FROM_ADDRESS', config('mail.from.address')],
            ['MAIL_FROM_NAME', config('mail.from.name')],
            ['APP_ENV', app()->environment()],
            ['LOG_CHANNEL', config('logging.default')],
        ]);
    }
}
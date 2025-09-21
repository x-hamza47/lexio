<?php

use Illuminate\Support\Facades\Artisan;


Artisan::command('app:start', function () {
    $this->info('Starting Laravel, Vite and Queue...');

    // Vite
    exec('start /B npm run dev');

    // Laravel server
    exec('start /B php artisan serve');

    // Queue worker
    exec('start /B php artisan queue:work');

    $this->info('All processes started!');
})->purpose('Start Laravel server, Vite, and queue worker');

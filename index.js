const { spawn } = require('child_process');
const path = require('path');

console.log('--- Starting Maria-MD Bridge ---');
console.log('Checking environment...');

function start() {
    console.log('Spawning plugins.js process...');
    let args = [path.join(__dirname, 'plugins.js'), ...process.argv.slice(2)];
    
    let p = spawn(process.argv[0], args, {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });

    p.on('message', data => {
        if (data == 'reset') {
            console.log('Restarting Bot...');
            p.kill();
            start();
        }
    });

    p.on('exit', code => {
        console.error('Process exited with code:', code);
        // Restart on any exit to keep it alive
        setTimeout(start, 5000);
    });

    p.on('error', err => {
        console.error('Failed to start process:', err);
    });
}

start();

module.exports = {
    apps: [
        {
            name: 'linksbox-be',
            script: './dist/src/main.js',
            instances: 2,
            mode: 'cluster',
            autorestart: true,
            ignore_watch: ['node_modules', 'public', 'assets'],
            watch_options: {
                followSymlinks: false,
            },
            env: {
                NODE_ENV: 'production',
                TZ: 'Asia/Seoul',
                PORT: 1234,
            },
            // Zero-downtime 설정
            watch: false,
            wait_ready: true,
            kill_timeout: 10000,
            listen_timeout: 50000,
            max_memory_restart: '1G',
            exp_backoff_restart_delay: 100,
            merge_logs: true,

            // 추가 shutdown 옵션
            shutdown_with_message: true,
            force: false
        },
    ],
};

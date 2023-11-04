## About

This Laravel backend is intended to be used with the [Akio](https://github.com/christiangendron/Akio/tree/main/mobile) mobile application.

## Prerequisites

Before getting started, ensure you have the following prerequisites installed on your system:

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)
- [Ubuntu-20.04](https://apps.microsoft.com/detail/ubuntu-20-04-6-lts/9MTTCL66CPXJ?hl=en-US&gl=US)

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/christiangendron/Akio.git
cd Akio/backend
```

2. Copy the .env.example as .env and set the missing keys
3. Installing Composer dependancies

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs
```

4. Generate key

```bash
./vendor/bin/sail artisan key:generate
```

5. Launch the project with 

```bash
./vendor/bin/sail up -d 
```

6. Execute migrations

```bash
./vendor/bin/sail artisan migrate:fresh
```

7. Terminate the backend

```bash
./vendor/bin/sail down
```

## Testing

1. Copy your .env as .env.testing
2. Change DB_DATABASE to 'testing'
3. Execute migrations no the testing

```bash
./vendor/bin/sail artisan migrate:fresh --env=testing
```

4. Launch tests

```bash
./vendor/bin/sail artisan test
```

## API Routes

The following link will provide information on all routes : [link](https://documenter.getpostman.com/view/20337635/2s9YXe8jwm)
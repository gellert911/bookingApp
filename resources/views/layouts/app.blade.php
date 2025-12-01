<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
    
    @vite('resources/js/app.jsx')
</head>
<body>
    <div class="toast-container position-fixed bottom-0 end-0 p-3"></div>
    @auth
        @if(auth()->user()->is_admin)
            <div class="bg-body-secondary text-dark py-1 px-3 border-bottom">
                <div class="container d-flex gap-3">
                    <a href="/admin" class="text-decoration-none">Admin</a>
                    <a href="/" class="text-decoration-none">Site</a>
                </div>
            </div>
        @endif
    @endauth

    <div class="content">
        <div id="app"></div>
    </div> 

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q" crossorigin="anonymous"></script>
</body>
</html>
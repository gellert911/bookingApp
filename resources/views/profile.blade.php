@extends('layouts/app')

@section('content')
    <div id="profile-root"></div>

    <script>
        window.__INITIAL_DATA__ = @json([
            'user' => $user,
        ]);
    </script>

    @vite('resources/js/react/Profile.jsx')
@endsection
@extends('layouts/app')

@section('content')
    <!--<div>Dashboard</div>

    <form method="POST" action="{{ route('logout') }}">
        @csrf
    <button type="submit">logout</button>-->
    @vite('resources/js/react/Dashboard.jsx')
    <div id="app"></div>
</form>
@endsection
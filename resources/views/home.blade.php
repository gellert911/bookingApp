@extends('layouts/app')

@section('content')
    <!--<div>Dashboard</div>

    <form method="POST" action="{{ route('logout') }}">
        @csrf
    <button type="submit">logout</button>-->
    @vite('resources/js/react/Home.jsx')
    <div id="app"></div>
@endsection
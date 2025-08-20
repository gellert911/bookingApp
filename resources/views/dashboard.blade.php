@extends('layouts/app')

@section('content')
    <div>Dashboard</div>

    <form method="POST" action="{{ route('logout') }}">
        @csrf
    <button type="submit">logout</button>
</form>
@endsection
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'username' => 'required|string|regex:/^[A-Za-z0-9_.-]+$/|max:50|unique:users',
            'email' => 'required|string|email|max:150|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'profile_pic' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Please enter your full name.',
            'username.required' => 'A username is required.',
            'username.unique' => 'This username is already taken.',
            'email.required' => 'We need your email to register.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email is already registered.',
            'password.required' => 'You must set a password.',
            'password.min' => 'Password must be at least :min characters.',
            'password.confirmed' => 'Passwords do not match.',
            'profile_pic.image' => 'Profile picture must be an image.',
            'profile_pic.mimes' => 'Profile picture must be JPG or PNG.',
            'profile_pic.max' => 'Profile picture cannot be larger than 2MB.',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'full name',
            'username' => 'user name',
            'email' => 'email address',
            'password' => 'password',
            'profile_pic' => 'profile picture',
        ];
    }


}

<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;
class PassportAuthController extends Controller
{
    /**
     * Registration
     */
    public function register(Request $request)
    {
        $input = $request->all();
       $validate = Validator::make($input,[
         "name"=>"required",
         "email"=>"required | email",
         "password"=>"required"
       ]);
       if($validate->fails()){
         return response()->json([
           "status"=>"validation error in registration "
         ]);
       }
       $data = new User();
       $data->name = $request->name;
       $data->email = $request->email;
       $data->password = bcrypt($request->password);
        if($request->hasfile('path')){
            $file = $request->file('path');
            $extension =$file->getClientOriginalExtension();
            $filename = time().'.'.$extension;
            $file->move('Uploads/Profile/',$filename);
            $data->path = $filename;
        }
        $data->save();
       return response()->json($data,200);
    }
 
    /**
     * Login
     */
    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];
 
        if (auth()->attempt($data)) {
            $token = auth()->user()->createToken('LaravelAuthApp')->accessToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function getuser(){
        $data = auth()->user();
        if($data){
          return response()->json(['user'=>$data,200]);
        }else{
            return response()->json(['status'=>'data not found . Make sure you are logedin.']);
        }
         }
    
    public function logout(Request $request){
        $accessToken = auth()->user()->token();
        $token= $request->user()->tokens->find($accessToken);
        if($token){
           $token->revoke();
            return response(['message' => 'You have been successfully logged out.'], 200);
        }else{
           return response()->json(['status'=>' Make sure you are logedin.']);
            
        }
      }
      public function updatepass(Request $req){
        
        $input=$req->all();
        $validate = Validator::make($input,[
          "newpass"=>"required"
        ]);
        if($validate->fails()){
          return response()->json([
            "ststus"=>"validation error"
          ]);
        
        }
    }
}
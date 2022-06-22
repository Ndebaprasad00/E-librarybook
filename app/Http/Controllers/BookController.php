<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Book;
use Validator;

class BookController extends Controller
{
    //
    public function createbook(Request $req){
        $book=new Book();
        $input = $req->all();
        $validate =Validator::make($input,[
            "title"=>"required",
            "content"=>"required",
            "created_by"=>"required"
        ]);
        $user= auth()->user();

        $id = $user->id;
        $input['user_id']= $id;
        if($validate->fails()){
            return response()->json([
                "status"=>"validation error here"
            ]);
        }else{
            $data = new Book();
            $data->title = $input['title'];
            $data->description = $input['description'];
            $data->content=$input['content'];
            $data->user_id=$input['user_id'];
            $data->created_by=$input['created_by'];
             if($req->hasfile('path')){
                 $file = $req->file('path');
                 $extension =$file->getClientOriginalExtension();
                 $filename = time().'.'.$extension;
                 $file->move('Uploads/CoverImage/',$filename);
                 $data->path = $filename;
             }
             $data->save();
            return['data'=>$data];


       return response()->json($data,200);
          }    
    }
    public function delete($id){
        $data=auth()->user()->books()->find($id);
        $data->delete();
        return response()->json([
            "status"=>$data
        ]);
      }
    public function singlebook($id){
        if(auth()->user()){
            $data = Book::find($id);
            return response()->json([
                'book'=>$data
            ]);
        }
    }
    public function readbook(){
        $data = auth()->user()->books;
        return response()->json([
            'book'=>$data
        ]);
    }
    public function allbooks(){
        if(auth()->user()){
            $data = Book::all();
            return response()->json([
                'book'=>$data
            ]);
        }
    }
    public function update(Request $request, $id){
        $input = $request->all();
        $validate =Validator::make($input,[
            "title"=>"required",
            "content" =>"required"
        
        ]);
        if($validate->fails()){
            return response()->json([
                "ststus"=>"Validation error",
              ]);   
        }
      $product= auth()->user()->books()->find($id);
      $product->title =$request->title;
      $product->content = $request->content;
      $product->save();
      return response()->json([
        "ststus"=>"Success",
        "product"=>$product
      ]);
   }
    
}

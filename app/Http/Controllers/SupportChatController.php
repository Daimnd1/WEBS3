<?php

namespace App\Http\Controllers;

use App\Models\SupportMessage;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SupportChatController extends Controller
{
    // Customer: Get their own messages
    public function getMessages(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        if ($user->isAdmin()) {                                                                       // Admin requesting specific user's messages
            if ($request->has('user_id')) {
                $messages = SupportMessage::where('user_id', $request->user_id)
                    ->orderBy('created_at', 'asc')
                    ->get();                                                                          // Mark as read
                SupportMessage::where('user_id', $request->user_id)
                    ->where('is_admin', false)
                    ->where('is_read', false)
                    ->update(['is_read' => true]);

                return response()->json(['messages' => $messages]);
            } else {
                $users = User::whereHas('supportMessages')
                    ->with(['supportMessages' => function ($query) {
                        $query->latest()->limit(1);
                    }])
                    ->withCount(['supportMessages as unread_count' => function ($query) {
                        $query->where('is_read', false)->where('is_admin', false);
                    }])
                    ->get();

                return response()->json(['users' => $users]);
            }
        } else {
            $messages = SupportMessage::where('user_id', $user->id)
                ->orderBy('created_at', 'asc')
                ->get();                                                        // Mark admin messages as read
            SupportMessage::where('user_id', $user->id)
                ->where('is_admin', true)
                ->where('is_read', false)
                ->update(['is_read' => true]);

            return response()->json(['messages' => $messages]);
        }
    }

    // Send a message
    public function sendMessage(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $user = Auth::user();

        if ($user->isAdmin() && $request->has('user_id')) {     // Admin sending to specific user
            $message = SupportMessage::create([
                'user_id' => $request->user_id,
                'message' => $request->message,
                'is_admin' => true,
                'is_read' => false,
            ]);
        } else {                                               // User sending message
            $message = SupportMessage::create([
                'user_id' => $user->id,
                'message' => $request->message,
                'is_admin' => false,
                'is_read' => false,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => $message,
        ]);
    }


    public function getUnreadCount(): JsonResponse
    {
        $user = Auth::user();
        
        $unreadCount = SupportMessage::where('user_id', $user->id)
            ->where('is_admin', true)
            ->where('is_read', false)
            ->count();

        return response()->json(['unread_count' => $unreadCount]);
    }


    public function adminDashboard(): Response
    {
        if (!Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Admin/SupportChat');
    }
}
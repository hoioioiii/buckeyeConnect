"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from '@/app/context/userContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProtectedRoute } from "@/app/context/protectedRoute";

interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string; // Optional field for profile picture
}

const FindFriendsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useContext must be used within a UserContextProvider');
  }

  const { user, logout } = userContext;
  console.log(user?.email);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users"); 
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const sendFriendInvite = async (userId: string) => {
    try {
      await axios.post("/friend-invite", { userId }); // TODO: Implement friend invite API
      alert("Friend invite sent!");
    } catch (err) {
      alert("Failed to send friend invite. Please try again.");
    }
  };

  const filteredUsers = users.filter(
    (users) =>
      users.email !== user?.email && // Exclude the logged-in user
      users.email !== "admin@osu.edu" && // Exclude the admin user
      users.name.toLowerCase().includes(search.toLowerCase()) // Apply search filter
  );
//   if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ProtectedRoute>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center text-pink-600 mb-4">
            Feautured Users
          </h1>
          <p className="text-xl font-bold text-center mb-4">Find friends with similar schedules, interests and more!</p>
          <Input
            type="text"
            placeholder="Search for people"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6"
          />
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user._id} className="flex items-center p-4">
                <CardContent className="flex-1">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {user.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </CardHeader>
                </CardContent>
                <Button
                  variant="default"
                  onClick={() => sendFriendInvite(user._id)}
                  className="ml-4 bg-pink-700"
                >
                  Add Friend
                </Button>
              </Card>
            ))}
          </div>
        </div>
    </ProtectedRoute>
  );
};

export default FindFriendsPage;
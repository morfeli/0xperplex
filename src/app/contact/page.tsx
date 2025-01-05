"use client";

import { useState } from "react";
import { DiscIcon as Discord, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { Nav } from "../../../components/Nav";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      toast({
        title: "Thank you! :) <3",
        description:
          "We've received your message and will get back to you soon.",
      });
      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main className="container mx-auto px-4 py-12 max-w-3xl fade-in">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl">
          <p className="text-lg mb-6">
            Have questions or want to get in touch? Fill out the form below, and
            we'll get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/20 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/20 text-white"
                rows={4}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Send Message
            </Button>
          </form>
        </div>
        <div className="mt-12 flex justify-center space-x-8">
          <Discord className="w-8 h-8 hover:text-purple-400 transition-colors duration-200" />
          <Linkedin className="w-8 h-8 hover:text-purple-400 transition-colors duration-200" />
          <Twitter className="w-8 h-8 hover:text-purple-400 transition-colors duration-200" />
        </div>
      </main>
    </div>
  );
}

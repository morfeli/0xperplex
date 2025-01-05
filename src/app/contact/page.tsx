/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";

import { Nav } from "../../../components/Nav";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setIsModalOpen(true);
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
        <div className="bg-black rounded-2xl p-8 shadow-xl">
          <p className="text-lg mb-6">
            Have questions or want to get in touch? Fill out the form below, and
            we'll get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/20 text-white rounded-xl"
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
                className="bg-white/20 text-white rounded-xl"
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
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/20 text-white w-full rounded-xl border border-white focus:outline-none p-2"
                rows={4}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 rounded-2xl"
            >
              Send Message
            </Button>
          </form>
        </div>
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thank you!"
      >
        <p>We've received your message and will get back to you soon.</p>
      </Modal>
    </div>
  );
}

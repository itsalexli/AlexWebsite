"use client";

import Image from "next/image";

export default function VibeCompose() {
  return (
    <div className="bg-white text-gray-900 leading-relaxed min-h-screen">
      <div className="max-w-6xl mx-auto p-10">
        {/* Project Header */}
        <div className="mb-16">
          <Image
            src="/VibeCompose.jpg"
            alt="VibeCompose"
            width={1200}
            height={400}
            className="w-full h-96 object-cover mb-10 rounded-lg"
          />
          <h1 className="text-5xl font-semibold mb-5 text-black">
            VibeCompose
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-black">
                timeline
              </h3>
              <p className="text-base text-gray-600 mb-6">January 2025</p>

              <h3 className="text-xl font-semibold mb-3 text-black">tools</h3>
              <div className="space-y-2">
                <p className="text-base text-gray-600">React</p>
                <p className="text-base text-gray-600">TypeScript</p>
                <p className="text-base text-gray-600">Node.js</p>
                <p className="text-base text-gray-600">OpenAI API</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-black">
                tl;dr what did I do?
              </h3>
              <p className="text-xl italic text-gray-600 mb-5">
                Designed an open-source notation coding agent for musical
                composition
              </p>

              <p className="text-base text-gray-700 mb-8">
                Created an innovative coding agent that helps musicians and
                developers compose music through natural language instructions
                and code generation.
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">
                  key features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-600">→</span>
                    <span className="text-base text-gray-600">
                      Natural language to musical notation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-600">→</span>
                    <span className="text-base text-gray-600">
                      Real-time code generation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-600">→</span>
                    <span className="text-base text-gray-600">
                      Interactive composition interface
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-semibold mb-5 text-black">Background</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            VibeCompose is an open-source project that bridges the gap between
            traditional musical composition and modern coding practices. In an
            era where AI is transforming creative workflows, there's a growing
            need for tools that help musicians express their ideas through code
            while maintaining the intuitive nature of musical creation. We aimed
            to solve that by creating an agent that understands both musical
            concepts and programming logic, allowing users to compose through
            natural language instructions that get translated into executable
            musical code.
          </p>
        </div>
      </div>
    </div>
  );
}

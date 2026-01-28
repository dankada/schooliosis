"use client";

export default function Contact() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl w-full mx-4 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact & Social Media</h2>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-lg text-center">Feel free to reach out to me through the following channels:</p>
            <ul className="space-y-4 text-center">
              <li className="text-lg">📧 <strong>Email:</strong> josh.breve@gmail.com</li>
              <li className="text-lg">
                🐙 <strong>GitHub:</strong> <a href="https://github.com/dankada" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@dankada</a>
              </li>
              
              <li className="text-lg">
                𝕏 <strong>Twitter:</strong> <a href="https://twitter.com/llshua" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@llshua</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
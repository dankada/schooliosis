"use client";

export default function Resources() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl w-full mx-4 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Credits & Resources</h2>
          
          <div className="space-y-8 text-gray-700">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Tools & Frameworks</h3>
              <ul className="space-y-3 text-lg text-center">
                <li><strong>Next.js</strong> - React Framework for production</li>
                <li><strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
                <li><strong>Lucide Icons</strong> - Beautiful & consistent icon library, much love</li>
              </ul>
            </div>



            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Resources</h3>
              <ul className="space-y-3 text-lg text-center">
                <li><a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lucide Icons Documentation</a></li>
                <li><a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Next.js Documentation</a></li>
                <li><a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tailwind CSS Documentation</a></li>
                <li><a href="https://developers.google.com/youtube/v3/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Youtube API Documentation</a></li>
                

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
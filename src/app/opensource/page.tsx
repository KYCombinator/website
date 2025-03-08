export default function OpenSourcePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Open Source</h1>
      
      <div className="prose prose-lg">
        <p className="mb-6">
          KYCombinator is proud to be an open source project. We believe in transparency, collaboration, and community-driven development.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our GitHub Repository</h2>
        <p className="mb-6">
          You can find our source code and contribute to the project on GitHub:
        </p>
        <a 
          href="https://github.com/KYCombinator/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Open Source Guidelines</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">1. Code of Conduct</h3>
            <p>We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct to help us create a positive environment for everyone.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">2. Contributing Guidelines</h3>
            <p>We welcome contributions from the community! Please read our contributing guidelines before submitting pull requests or opening issues.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">3. License</h3>
            <p>This project is licensed under the MIT License - see the LICENSE file for details.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">4. Getting Started</h3>
            <p>To get started with development:</p>
            <ol className="list-decimal list-inside mt-2">
              <li>Fork the repository</li>
              <li>Create your feature branch</li>
              <li>Commit your changes</li>
              <li>Push to the branch</li>
              <li>Create a new Pull Request</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
} 
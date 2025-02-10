export default function UnlimitedAccess() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Unlimited Access</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 hover:border-blue-500 transition-colors">
          <h2 className="text-2xl font-bold mb-2">Basic</h2>
          <div className="text-3xl font-bold mb-4">
            $9.99
            <span className="text-sm text-neutral-400 font-normal">/month</span>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Access to all books
            </li>
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Basic AI assistance
            </li>
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Quote practice mode
            </li>
          </ul>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-neutral-900 rounded-xl p-6 border-2 border-blue-500 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
            Most Popular
          </div>
          <h2 className="text-2xl font-bold mb-2">Premium</h2>
          <div className="text-3xl font-bold mb-4">
            $19.99
            <span className="text-sm text-neutral-400 font-normal">/month</span>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Everything in Basic
            </li>
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Advanced AI features
            </li>
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Exam preparation tools
            </li>
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Priority support
            </li>
          </ul>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Start Free Trial
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 hover:border-blue-500 transition-colors">
          <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
          <div className="text-3xl font-bold mb-4">
            Custom
            <span className="text-sm text-neutral-400 font-normal">/year</span>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Everything in Premium
            </li>
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Custom AI training
            </li>
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              Dedicated support
            </li>
            <li className="flex items-center text-neutral-300">
              <CheckIcon className="mr-2" />
              API access
            </li>
          </ul>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      className={`w-5 h-5 text-blue-500 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function Lessons() {
  return (
    <div className="min-h-screen bg-[#0B0A2A] text-white px-6 py-12 flex flex-col items-center justify-center pt-32">
      <h1 className="text-4xl font-bold text-blue-300 mb-4 text-center">
        Typing Tips & Tricks 💡
      </h1>

      <div className="space-y-6 max-w-3xl mx-auto text-lg leading-relaxed">
        <p className="text-purple-300">
          🧠 <strong>Tip 1:</strong> Sit up straight and keep both feet flat on
          the floor. Good posture helps you type faster and feel less tired.
        </p>

        <p className="text-blue-200">
          ⌨️ <strong>Tip 2:</strong> Learn to place your fingers on the home row
          (ASDF for the left hand, JKL; for the right hand).
        </p>

        <p className="text-purple-300">
          👀 <strong>Tip 3:</strong> Don’t look at the keyboard! Try to memorize
          where the keys are — it gets easier over time.
        </p>

        <p className="text-blue-200">
          ⏱️ <strong>Tip 4:</strong> Practice a little every day — even just 5
          minutes can help you improve fast.
        </p>

        <p className="text-purple-300">
          🎯 <strong>Tip 5:</strong> Focus on accuracy first, not speed. Speed
          will come automatically when you make fewer mistakes.
        </p>

        <p className="text-blue-200">
          😄 <strong>Tip 6:</strong> Use typing games or fun texts to stay
          motivated while learning!
        </p>
      </div>
    </div>
  );
}

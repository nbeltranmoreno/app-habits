import { Check, Clock, Trash2 } from 'lucide-react';

export default function HabitList({ habits, toggleHabit, deleteHabit }) {
  if (habits.length === 0) {
    return (
      <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center border-2 border-white/30">
        <Clock className="w-14 h-14 text-white/60 mx-auto mb-3" />
        <p className="text-white/90 font-bold text-lg">No tienes hábitos aún</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-24">
      {habits.map(habit => (
        <div
          key={habit.id}
          className={`bg-white/20 backdrop-blur rounded-2xl p-4 flex items-center gap-4 border-2 border-white/30 ${
            habit.completed ? 'opacity-75' : ''
          }`}
        >
          <button
            onClick={() => toggleHabit(habit.id)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl ${
              habit.completed
                ? 'bg-green-500 border-4 border-green-300'
                : 'bg-white/30 border-4 border-white/50'
            }`}
          >
            {habit.completed && <Check className="w-8 h-8 text-white" strokeWidth={3} />}
          </button>
          <div className="flex-1">
            <p
              className={`text-white font-bold text-lg ${
                habit.completed ? 'line-through opacity-70' : ''
              }`}
            >
              {habit.name}
            </p>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{habit.time}</span>
              {habit.completed && <span className="text-yellow-300 font-black">+2 ⭐</span>}
            </div>
          </div>
          <button
            onClick={() => deleteHabit(habit.id)}
            className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center hover:bg-red-500/60 border-2 border-white/30"
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        </div>
      ))}
    </div>
  );
}

import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

export default function Notification() {
  const { notifications } = useStore();
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[60] space-y-2">
      {notifications.map(n => {
        const Icon = icons[n.type] || icons.info;
        return (
          <div
            key={n.id}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-lg animate-slide-in ${colors[n.type] || colors.info}`}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{n.message}</span>
          </div>
        );
      })}
    </div>
  );
}

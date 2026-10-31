import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  variant?: 'default' | 'primary' | 'warning' | 'danger' | 'success';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  onClick,
}) => {
  const iconVariants = {
    default: 'bg-blue-50 text-mygov-blue',
    primary: 'bg-sky-50 text-mygov-blue',
    warning: 'bg-orange-50 text-mygov-orange',
    danger: 'bg-rose-50 text-rose-600',
    success: 'bg-emerald-50 text-emerald-700',
  };

  const borderTopVariants = {
    default: 'border-t-2 border-t-slate-300 hover:border-blue-300',
    primary: 'border-t-2 border-t-mygov-blue hover:border-blue-500',
    warning: 'border-t-2 border-t-mygov-orange hover:border-orange-500',
    danger: 'border-t-2 border-t-rose-500 hover:border-rose-400',
    success: 'border-t-2 border-t-mygov-green hover:border-emerald-500',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 p-5 shadow-card transition-all duration-200 transform hover:-translate-y-0.5 ${borderTopVariants[variant]} ${
        onClick ? 'cursor-pointer hover:shadow-elevated' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            {value}
          </p>
        </div>
        <div className={`p-2.5 rounded-lg ${iconVariants[variant]} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          {subtitle && <span className="truncate">{subtitle}</span>}
          {trend && (
            <span
              className={`font-medium ml-auto flex items-center gap-1 ${
                trend.isPositive ? 'text-emerald-600' : 'text-slate-600'
              }`}
            >
              <span>{trend.value}</span>
              {trend.label && <span className="text-slate-400 font-normal">{trend.label}</span>}
            </span>
          )}
        </div>
      )}
    </div>
  );
};


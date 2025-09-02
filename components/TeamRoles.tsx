import React from 'react';
import type { TeamRole } from '../types';
import { UsersIcon, CheckCircleIcon } from './icons';
import Spinner from './Spinner';

interface TeamRolesProps {
  roles: TeamRole[];
  isLoading: boolean;
}

const TeamRoles: React.FC<TeamRolesProps> = ({ roles, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mt-8 backdrop-blur-sm" aria-live="polite">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <UsersIcon className="h-8 w-8 text-purple-400" />
          بناء فريق الأحلام...
        </h3>
        <Spinner />
      </div>
    );
  }

  if (roles.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mt-8 backdrop-blur-sm animate-fade-in">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <UsersIcon className="h-8 w-8 text-purple-400" />
        الأدوار المقترحة للفريق
      </h3>
      <div className="space-y-6">
        {roles.map((role, index) => (
          <div key={index} className="bg-slate-800 p-4 rounded-md border border-slate-700">
            <h4 className="font-bold text-purple-400 text-lg">{role.role}</h4>
            <p className="text-slate-300 mt-1 mb-3">{role.description}</p>
            <ul className="space-y-2">
              {role.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" aria-hidden="true" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamRoles;
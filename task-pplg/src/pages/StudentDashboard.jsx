import React from 'react';
import SkillRadarChart from '../components/charts/SkillRadarChart';
import { MoreHorizontal, ExternalLink } from 'lucide-react';

export default function StudentDashboard({ tasks = [], projects = [], profile = {} }) {
    const completedTasks = tasks.filter((task) => task.completed || task.status === 'Done').length;
    const overallProgress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;
    const activeCourses = Math.max(1, Math.min(6, tasks.length || 4));
    const completedLabs = completedTasks;
    const peerReviews = 18;
    const currentDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const showcaseProjects = projects.slice(0, 3);

    return (
        <div className="dashboard-main-grid">
            <div className="dashboard-left-col">
                <div className="welcome-header">
                    <h1>Welcome Back, {profile.full_name || 'Sarah Chen'}!</h1>
                    <p>Current date, {currentDate}</p>
                </div>

                <div className="student-stats-row">
                    <div className="stat-card-pill">
                        <span>Overall Progress</span>
                        <div className="circular-gauge">
                            <div className="gauge-inner">{overallProgress}%</div>
                        </div>
                    </div>
                    <div className="stat-card-pill">
                        <span>Active Courses</span>
                        <h2>{activeCourses}</h2>
                    </div>
                    <div className="stat-card-pill">
                        <span>Completed Labs</span>
                        <h2>{completedLabs}</h2>
                    </div>
                    <div className="stat-card-pill">
                        <span>Peer Reviews</span>
                        <h2>{peerReviews}</h2>
                    </div>
                </div>

                <div className="card-panel-box">
                    <div className="panel-header-row">
                        <div>
                            <h3>Competency Radar Chart</h3>
                            <small>{profile.full_name || 'Sarah'}'s Skills Profile</small>
                        </div>
                        <MoreHorizontal size={16} className="more-dots" />
                    </div>
                    <SkillRadarChart />
                </div>
            </div>

            <div className="dashboard-right-col">
                <div className="card-panel-box">
                    <div className="panel-header-row">
                        <h3>Current Sprint Tasks</h3>
                        <MoreHorizontal size={16} className="more-dots" />
                    </div>

                    <div className="sprint-task-columns">
                        {['To Do', 'In Progress', 'Review', 'Done'].map((status) => (
                            <div key={status} className="sprint-column">
                                <div className="column-label"><span>{status}</span><MoreHorizontal size={12} /></div>
                                {tasks.filter((task) => task.status === status).slice(0, 2).map((task) => (
                                    <div key={task.id} className="task-item-bubble">
                                        <strong>{task.title}</strong>
                                        <p>{task.category} • {task.priority}</p>
                                        <div className="task-footer-row">
                                            <div className="user-mini-row"><div className="user-mini-avatar"></div><span>{profile.full_name || 'Sarah'}</span></div>
                                            <span className={`task-badge ${task.priority === 'High' ? 'status' : task.priority === 'Medium' ? 'indigo' : 'violet'}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {tasks.filter((task) => task.status === status).length === 0 && (
                                    <div className="task-item-bubble">
                                        <strong>Belum ada tugas</strong>
                                        <p>Tidak ada tugas pada kolom ini.</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-panel-box">
                    <div className="panel-header-row">
                        <h3>Student Portfolio Showcase</h3>
                        <MoreHorizontal size={16} className="more-dots" />
                    </div>

                    <div className="showcase-cards-row">
                        {showcaseProjects.map((project) => (
                            <div key={project.id} className="showcase-mini-card">
                                <div className="showcase-screen-mock">{project.title}</div>
                                <strong>{project.title}</strong>
                                <small>{project.category} • {project.tech.slice(0, 2).join('/')}
                                    <br />{project.description.slice(0, 64)}...</small>
                                <div className="showcase-tags">
                                    {(project.tech || []).slice(0, 3).map((item, index) => (
                                        <span key={`${project.id}-${item}`} className="chip-tag">{item}</span>
                                    ))}
                                </div>
                                <a href={project.githubUrl || '#'} className="showcase-link-row" target="_blank" rel="noreferrer">
                                    Links <ExternalLink size={11} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
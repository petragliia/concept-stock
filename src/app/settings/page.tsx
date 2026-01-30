'use client';

import { useInventoryStore } from "@/store/inventoryStore";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, User, Bell, Globe, Moon, Save, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const { user, settings, updateUser, toggleNotification, updateSettings, addToast } = useInventoryStore();
    const [activeSection, setActiveSection] = useState<string | null>('profile');
    const [tempUser, setTempUser] = useState(user);

    const handleSaveProfile = () => {
        updateUser(tempUser);
        addToast({
            title: "Perfil Atualizado",
            description: "Suas informações foram salvas com sucesso.",
            type: "success"
        });
    };

    const toggleSection = (id: string) => {
        setActiveSection(activeSection === id ? null : id);
    };

    const sections = [
        {
            id: 'profile',
            title: "Perfil do Usuário",
            icon: User,
            desc: "Gerencie suas informações pessoais.",
            content: (
                <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400">Nome Completo</label>
                            <input
                                type="text"
                                value={tempUser.name}
                                onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400">E-mail</label>
                            <input
                                type="email"
                                value={tempUser.email}
                                onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
                                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400">Cargo</label>
                        <input
                            type="text"
                            value={tempUser.role}
                            disabled
                            className="w-full bg-brand-950/50 border border-brand-800/50 rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            onClick={handleSaveProfile}
                            className="flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            <Save className="h-4 w-4" />
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            )
        },
        {
            id: 'notifications',
            title: "Notificações",
            icon: Bell,
            desc: "Escolha quais alertas deseja receber.",
            content: (
                <div className="space-y-2 pt-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-brand-950/30 border border-brand-800/30">
                            <span className="text-sm text-slate-300 capitalize">
                                {key === 'email' ? 'Notificações por Email' :
                                    key === 'push' ? 'Notificações Push' :
                                        key === 'lowStock' ? 'Alerta de Baixo Estoque' :
                                            'Relatório Semanal'}
                            </span>
                            <button
                                onClick={() => toggleNotification(key as any)}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                                    value ? 'bg-accent-600' : 'bg-slate-700'
                                )}
                            >
                                <span
                                    className={cn(
                                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                        value ? 'translate-x-6' : 'translate-x-1'
                                    )}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            )
        },
        {
            id: 'system',
            title: "Preferências de Sistema",
            icon: Settings,
            desc: "Ajuste tema e idioma.",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-lg bg-brand-950/30 border border-brand-800/30 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Moon className="h-4 w-4 text-accent-400" />
                            <span>Tema</span>
                        </div>
                        <div className="flex gap-2">
                            {['dark', 'light', 'system'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => updateSettings({ theme: t as any })}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors flex items-center gap-1",
                                        settings.theme === t
                                            ? "bg-accent-600/20 border-accent-500 text-accent-400"
                                            : "border-brand-800 text-slate-500 hover:text-white"
                                    )}
                                >
                                    {settings.theme === t && <Check className="h-3 w-3" />}
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-brand-950/30 border border-brand-800/30 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Globe className="h-4 w-4 text-accent-400" />
                            <span>Idioma</span>
                        </div>
                        <select
                            value={settings.language}
                            onChange={(e) => updateSettings({ language: e.target.value as any })}
                            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500"
                        >
                            <option value="pt-BR">Português (BR)</option>
                            <option value="en-US">English (US)</option>
                        </select>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white">Configurações</h1>
                <p className="text-slate-400">Personalize sua experiência no Concept Stock.</p>
            </motion.div>

            <div className="space-y-4">
                {sections.map((section, i) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-xl border border-brand-800/50 bg-brand-900/30 overflow-hidden"
                    >
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-6 hover:bg-brand-800/20 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-brand-800/50 text-accent-400">
                                    <section.icon className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-white">{section.title}</h3>
                                    <p className="text-sm text-slate-500">{section.desc}</p>
                                </div>
                            </div>
                            <ChevronDown
                                className={cn(
                                    "h-5 w-5 text-slate-500 transition-transform duration-300",
                                    activeSection === section.id ? "rotate-180" : ""
                                )}
                            />
                        </button>

                        <AnimatePresence>
                            {activeSection === section.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0 border-t border-brand-800/30">
                                        {section.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

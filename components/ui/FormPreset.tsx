import { ReactNode, ElementType } from 'react'

type FormPresetProps = {
    title?: string
    subtitle?: string
    icon?: ElementType // Accepts a React component, like Lucide icons
    children: ReactNode
}

export default function FormPreset({ children, title, subtitle, icon: Icon }: FormPresetProps) {
    return (
        <div className="max-w-3xl mx-auto mb-10 mt-5 p-[4px] bg-gradient-to-br dark:from-blue-800 from-blue-200 via-blue-500 to-blue-200 dark:to-blue-900 rounded-xl shadow-xl">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-5">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-full">
                            {Icon ? <Icon size={20} className="text-white" /> : null}
                        </div>
                        <h2 className="text-white font-semibold text-lg">
                            {title || "Form Title"}
                        </h2>
                    </div>

                    <p className="text-slate-300 text-sm mt-1 ml-10">
                        {subtitle || "Complete the form to proceed."}
                    </p>
                </div>

                {children}
            </div>
        </div>
    )
}

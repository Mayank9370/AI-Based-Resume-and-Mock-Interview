import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	const renderSection = (section) => {
		const { type, title, data: items } = section;
		if (!items || items.length === 0) return null;

		return (
			<section key={section.id} className="mb-8">
				<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200" style={{ borderColor: accentColor }}>
					{title}
				</h2>

				{/* SKILLS */}
				{type === "skills" && (
					<div className="flex flex-wrap gap-2">
						{items.map((skill, index) => (
							<span
								key={index}
								className="px-3 py-1 text-sm text-white rounded-full"
								style={{ backgroundColor: accentColor }}
							>
								{skill}
							</span>
						))}
					</div>
				)}

				{/* EXPERIENCE */}
				{type === "experience" && (
					<div className="space-y-6">
						{items.map((exp, index) => (
							<div key={index} className="relative pl-6 border-l border-gray-200">
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
										<p className="font-medium" style={{ color: accentColor }}>{exp.company}</p>
									</div>
									<div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
										{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
									</div>
								</div>
								{exp.description && (
									<div className="text-gray-700 leading-relaxed mt-3 resume-html-content" dangerouslySetInnerHTML={{ __html: exp.description }} />
								)}
							</div>
						))}
					</div>
				)}

				{/* PROJECTS */}
				{type === "project" && (
					<div className="space-y-6">
						{items.map((p, index) => (
							<div key={index} className="relative pl-6 border-l border-gray-200" style={{ borderLeftColor: accentColor }}>
								<div className="flex justify-between items-start">
									<div>
										<h3 className="text-lg font-medium text-gray-900">
											{p.name}
											{p.link && (
												<a href={p.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-blue-600 hover:underline">
													[Link]
												</a>
											)}
										</h3>
										{p.role && <p className="text-sm text-gray-600">{p.role}</p>}
										{p.tech && <p className="text-xs text-gray-500 italic mt-1">{p.tech}</p>}
									</div>
									{(p.start_date || p.end_date) && (
										<div className="text-sm text-gray-500">
											{formatDate(p.start_date)} {p.end_date && `- ${formatDate(p.end_date)}`}
										</div>
									)}
								</div>
								{p.description && (
									<div className="text-gray-700 leading-relaxed text-sm mt-2 resume-html-content" dangerouslySetInnerHTML={{ __html: p.description }} />
								)}
								{p.bullets && p.bullets.length > 0 && p.bullets.some(b => b.trim()) && (
									<ul className="list-disc list-outside ml-4 mt-2 text-sm text-gray-700">
										{p.bullets.map((b, i) => b && b.trim() && <li key={i}>{b}</li>)}
									</ul>
								)}
							</div>
						))}
					</div>
				)}

				{/* EDUCATION */}
				{type === "education" && (
					<div className="space-y-4">
						{items.map((edu, index) => (
							<div key={index}>
								<h3 className="font-semibold text-gray-900">
									{edu.degree} {edu.field && `in ${edu.field}`}
								</h3>
								<p style={{ color: accentColor }}>{edu.institution}</p>
								<div className="flex justify-between items-center text-sm text-gray-600">
									<span>{formatDate(edu.graduation_date)}</span>
									{edu.gpa && <span>GPA: {edu.gpa}</span>}
								</div>
							</div>
						))}
					</div>
				)}

				{/* CUSTOM / OTHER */}
				{(type === "custom" || type === "other") && (
					<div className="space-y-4">
						{items.map((item, i) => (
							<div key={i} className="relative pl-6 border-l border-gray-200" style={{ borderLeftColor: accentColor }}>
								{(item.heading || item.title) && (
									<h3 className="font-semibold text-gray-900">{item.heading || item.title}</h3>
								)}
								{(item.subheading || item.subtitle) && (
									<p className="font-medium text-gray-700">{item.subheading || item.subtitle}</p>
								)}

								{item.description && (
									<div className="text-gray-700 mt-2 text-sm resume-html-content" dangerouslySetInnerHTML={{
										__html: Array.isArray(item.description)
											? item.description.join('<br>')
											: item.description
									}} />
								)}

								{(item.date || item.start_date) && (
									<p className="text-sm text-gray-500 mt-1">
										{item.date ? item.date : `${formatDate(item.start_date)} - ${item.is_current ? "Present" : formatDate(item.end_date)}`}
									</p>
								)}
							</div>
						))}
					</div>
				)}
			</section>
		);
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800 shadow-lg">
			{/* Header */}
			<header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-light mb-3">
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
					{data.personal_info?.email && (
						<div className="flex items-center gap-2">
							<Mail className="size-4" />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2">
							<Phone className="size-4" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-2">
							<MapPin className="size-4" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a target="_blank" href={data.personal_info?.linkedin} className="flex items-center gap-2 hover:underline">
							<Linkedin className="size-4" />
							<span className="break-all text-xs">{data.personal_info.linkedin}</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a target="_blank" href={data.personal_info?.website} className="flex items-center gap-2 hover:underline">
							<Globe className="size-4" />
							<span className="break-all text-xs">{data.personal_info.website}</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-8">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200" style={{ borderColor: accentColor }}>
							Professional Summary
						</h2>
						<div className="text-gray-700 leading-relaxed resume-html-content" dangerouslySetInnerHTML={{ __html: data.professional_summary }} />
					</section>
				)}

				{/* DYNAMIC SECTIONS */}
				{data.sections && data.sections.length > 0 ? (
					data.sections.map(section => renderSection(section))
				) : (
					<>
						{/* Fallback for old data format if needed, though we should likely rely on sections */}
						{data.experience && renderSection({ id: "st-exp", type: "experience", title: "Experience", data: data.experience })}
						{data.project && renderSection({ id: "st-proj", type: "project", title: "Projects", data: data.project })}
						{data.education && renderSection({ id: "st-edu", type: "education", title: "Education", data: data.education })}
						{data.skills && renderSection({ id: "st-skills", type: "skills", title: "Skills", data: data.skills })}
					</>
				)}
			</div>
		</div>
	);
};

export default ModernTemplate;
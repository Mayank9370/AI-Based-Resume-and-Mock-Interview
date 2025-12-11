import React from 'react';

const CustomSectionPreview = ({ data, accentColor }) => {
    if (!data || !Array.isArray(data)) return null;

    return (
        <div className="w-full">
            {data.map((item, index) => (
                <div key={index} className="mb-4 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                        {item.title && (
                            <h4 className="font-bold text-gray-800" style={{ color: accentColor }}>
                                {item.title}
                            </h4>
                        )}
                        {item.date && (
                            <span className="text-sm text-gray-500 font-medium">
                                {item.date}
                            </span>
                        )}
                    </div>

                    {item.subtitle && (
                        <div className="text-sm font-semibold text-gray-700 mb-1">
                            {item.subtitle}
                        </div>
                    )}

                    {item.description && (
                        <div className="text-sm text-gray-600 leading-relaxed">
                            {Array.isArray(item.description) ? (
                                <ul className="list-disc list-outside ml-4 space-y-1">
                                    {item.description.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{item.description}</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CustomSectionPreview;

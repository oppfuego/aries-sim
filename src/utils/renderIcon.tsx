// /utils/renderIcon.tsx
import React from "react";
import { ICONS, IconKey } from "@/resources/icons";

export function renderIcon(
    icon?: IconKey | string | React.ReactNode
): React.ReactNode {
    if (!icon) return null;

    if (React.isValidElement(icon)) {
        return icon;
    }

    if (typeof icon === "string" && icon in ICONS) {
        const IconComponent = ICONS[icon as IconKey];
        return <IconComponent />;
    }

    if (typeof icon === "string") {
        return <span>{icon}</span>;
    }

    return null;
}

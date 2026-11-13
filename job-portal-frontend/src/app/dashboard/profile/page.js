// "use client";
// import { useCallback, useEffect, useState } from "react";
// import { Pencil, Trash2, UserCircle, Mail, MapPin, Phone, Briefcase, Link as LinkIcon } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { createProfile, deleteProfile, getProfile, updateProfile } from "@/services/profileService";
// import { getErrorMessage } from "@/services/api";
// import { useToast } from "@/components/common/Toast";
// import PageHeader from "@/components/dashboard/PageHeader";
// import ProfileForm from "@/components/profile/ProfileForm";
// import ConfirmDialog from "@/components/common/ConfirmDialog";
// import EmptyState from "@/components/common/EmptyState";
// import ErrorNotice from "@/components/common/ErrorNotice";
// import { PageLoader } from "@/components/common/Spinner";
// import { skillList } from "@/utils/format";

// export default function ProfilePage() {
//   const { user } = useAuth();
//   const toast = useToast();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [mode, setMode] = useState("view"); // view | create | edit
//   const [busy, setBusy] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const load = useCallback(async () => {
//     setLoading(true); setError("");
//     try { setProfile(await getProfile(user?.userId)); }
//     catch (e) {
//       if (e?.response?.status === 404) setProfile(null); // "Profile not found" = no profile yet
//       else setError(getErrorMessage(e));
//     } finally { setLoading(false); }
//   }, [user?.userId]);
//   useEffect(() => { load(); }, [load]);

//   const save = async (values) => {
//     setBusy(true);
//     try {
//       if (mode === "create") await createProfile(user?.userId, values); else await updateProfile(user?.userId, values);
//       toast.success(mode === "create" ? "Profile created." : "Profile updated.");
//       setMode("view"); await load();
//     } catch (e) {
//       const status = e?.response?.status;
//       toast.error(status === 409 ? "You already have a profile. Edit it instead." : getErrorMessage(e, "Could not save your profile."));
//     } finally { setBusy(false); }
//   };

//   const remove = async () => {
//     setBusy(true);
//     try { await deleteProfile(user?.userId); toast.success("Profile deleted."); setConfirmDelete(false); setProfile(null); }
//     catch (e) { toast.error(getErrorMessage(e, "Could not delete your profile.")); }
//     finally { setBusy(false); }
//   };

//   if (loading) return <PageLoader />;
//   if (error) return <ErrorNotice message={error} onRetry={load} />;

//   if (mode !== "view") {
//     return (
//       <>
//         <PageHeader title={mode === "create" ? "Create your profile" : "Edit your profile"} />
//         <ProfileForm initial={mode === "edit" ? profile : null} submitLabel={mode === "create" ? "Create profile" : "Save changes"} busy={busy} onSubmit={save} onCancel={() => setMode("view")} />
//       </>
//     );
//   }

//   if (!profile) {
//     return (
//       <>
//         <PageHeader title="My profile" />
//         <EmptyState icon={UserCircle} title="No profile yet" message="Add your details once and reuse them every time you apply." action={<button className="btn-primary" onClick={() => setMode("create")}>Create profile</button>} />
//       </>
//     );
//   }

//   const rows = [[Mail, "Email", user?.email], [Phone, "Phone", profile.phone], [MapPin, "Location", profile.location], [Briefcase, "Experience", `${profile.experienceYears ?? 0} years`]];
//   return (
//     <>
//       <PageHeader title="My profile" action={
//         <div className="flex gap-2">
//           <button className="btn-secondary" onClick={() => setMode("edit")}><Pencil className="h-4 w-4" />Edit</button>
//           <button className="btn-secondary text-red-600" onClick={() => setConfirmDelete(true)}><Trash2 className="h-4 w-4" />Delete</button>
//         </div>} />
//       <div className="card">
//         <div className="flex items-center gap-4">
//           <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">{profile.fullName?.[0]?.toUpperCase() || "?"}</div>
//           <h2 className="text-xl font-semibold">{profile.fullName}</h2>
//         </div>
//         <dl className="mt-6 grid gap-4 sm:grid-cols-2">
//           {rows.map(([Icon, label, value]) => (
//             <div key={label} className="flex items-start gap-3"><Icon className="mt-0.5 h-4 w-4 text-slate-400" /><div><dt className="text-xs text-slate-500">{label}</dt><dd className="text-sm font-medium">{value || "—"}</dd></div></div>
//           ))}
//           <div className="flex items-start gap-3"><LinkIcon className="mt-0.5 h-4 w-4 text-slate-400" /><div><dt className="text-xs text-slate-500">Resume</dt><dd className="text-sm font-medium">{profile.resumeUrl ? <a className="text-brand-700 hover:underline" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">Open resume</a> : "—"}</dd></div></div>
//         </dl>
//         {profile.bio && <><h3 className="mt-6 text-sm font-semibold">Bio</h3><p className="mt-1 whitespace-pre-line text-sm text-slate-700">{profile.bio}</p></>}
//         {skillList(profile.skills).length > 0 && <><h3 className="mt-6 text-sm font-semibold">Skills</h3><div className="mt-2 flex flex-wrap gap-2">{skillList(profile.skills).map((s) => <span key={s} className="chip">{s}</span>)}</div></>}
//       </div>
//       <ConfirmDialog open={confirmDelete} title="Delete your profile?" message="This permanently removes your profile details. You can create a new one later." busy={busy} onConfirm={remove} onCancel={() => setConfirmDelete(false)} />
//     </>
//   );
// }


"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Pencil,
    Trash2,
    UserCircle,
    Mail,
    MapPin,
    Phone,
    Briefcase,
    Link as LinkIcon,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
    createProfile,
    deleteProfile,
    getProfile,
    updateProfile,
} from "@/services/profileService";
import { getErrorMessage } from "@/services/api";
import { useToast } from "@/components/common/Toast";
import PageHeader from "@/components/dashboard/PageHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import ErrorNotice from "@/components/common/ErrorNotice";
import { PageLoader } from "@/components/common/Spinner";
import { skillList } from "@/utils/format";

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const toast = useToast();

    // Support both possible user ID property names.
    const userId = user?.userId ?? user?.id;

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [mode, setMode] = useState("view");
    const [busy, setBusy] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    // Load profile
    const load = useCallback(async () => {
        if (authLoading) return;

        if (!userId) {
            setError("User ID not found. Please log in again.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await getProfile(userId);
            setProfile(data);
        } catch (e) {
            if (e?.response?.status === 404) {
                setProfile(null);
            } else {
                setError(getErrorMessage(e));
            }
        } finally {
            setLoading(false);
        }
    }, [userId, authLoading]);

    useEffect(() => {
        load();
    }, [load]);

    // Create or update profile
    const save = async (values) => {
        if (!userId) {
            toast.error("User ID not found. Please log in again.");
            return;
        }

        setBusy(true);

        try {
            if (mode === "create") {
                await createProfile(userId, values);
            } else {
                await updateProfile(userId, values);
            }

            toast.success(
                mode === "create"
                    ? "Profile created."
                    : "Profile updated."
            );

            setMode("view");
            await load();
        } catch (e) {
            const status = e?.response?.status;

            toast.error(
                status === 409
                    ? "You already have a profile. Edit it instead."
                    : getErrorMessage(e, "Could not save your profile.")
            );
        } finally {
            setBusy(false);
        }
    };

    // Delete profile
    const remove = async () => {
        if (!userId) {
            toast.error("User ID not found. Please log in again.");
            return;
        }

        setBusy(true);

        try {
            await deleteProfile(userId);

            toast.success("Profile deleted.");
            setConfirmDelete(false);
            setProfile(null);
        } catch (e) {
            toast.error(
                getErrorMessage(e, "Could not delete your profile.")
            );
        } finally {
            setBusy(false);
        }
    };

    if (authLoading || loading) {
        return <PageLoader />;
    }

    if (error) {
        return <ErrorNotice message={error} onRetry={load} />;
    }

    // Create or edit form
    if (mode !== "view") {
        return (
            <>
                <PageHeader
                    title={
                        mode === "create"
                            ? "Create your profile"
                            : "Edit your profile"
                    }
                />

                <ProfileForm
                    initial={mode === "edit" ? profile : null}
                    submitLabel={
                        mode === "create"
                            ? "Create profile"
                            : "Save changes"
                    }
                    busy={busy}
                    onSubmit={save}
                    onCancel={() => setMode("view")}
                />
            </>
        );
    }

    // No profile found
    if (!profile) {
        return (
            <>
                <PageHeader title="My profile" />

                <EmptyState
                    icon={UserCircle}
                    title="No profile yet"
                    message="Add your details once and reuse them every time you apply."
                    action={
                        <button
                            className="btn-primary"
                            onClick={() => setMode("create")}
                        >
                            Create profile
                        </button>
                    }
                />
            </>
        );
    }

    const rows = [
        [Mail, "Email", user?.email],
        [Phone, "Phone", profile.phone],
        [MapPin, "Location", profile.location],
        [
            Briefcase,
            "Experience",
            `${profile.experienceYears ?? 0} years`,
        ],
    ];

    return (
        <>
            <PageHeader
                title="My profile"
                action={
                    <div className="flex gap-2">
                        <button
                            className="btn-secondary"
                            onClick={() => setMode("edit")}
                        >
                            <Pencil className="h-4 w-4" />
                            Edit
                        </button>

                        <button
                            className="btn-secondary text-red-600"
                            onClick={() => setConfirmDelete(true)}
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                    </div>
                }
            />

            <div className="card">
                <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">
                        {profile.fullName?.[0]?.toUpperCase() || "?"}
                    </div>

                    <h2 className="text-xl font-semibold">
                        {profile.fullName}
                    </h2>
                </div>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                    {rows.map(([Icon, label, value]) => (
                        <div
                            key={label}
                            className="flex items-start gap-3"
                        >
                            <Icon className="mt-0.5 h-4 w-4 text-slate-400" />

                            <div>
                                <dt className="text-xs text-slate-500">
                                    {label}
                                </dt>

                                <dd className="text-sm font-medium">
                                    {value || "—"}
                                </dd>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-start gap-3">
                        <LinkIcon className="mt-0.5 h-4 w-4 text-slate-400" />

                        <div>
                            <dt className="text-xs text-slate-500">
                                Resume
                            </dt>

                            <dd className="text-sm font-medium">
                                {profile.resumeUrl ? (
                                    <a
                                        className="text-brand-700 hover:underline"
                                        href={profile.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open resume
                                    </a>
                                ) : (
                                    "—"
                                )}
                            </dd>
                        </div>
                    </div>
                </dl>

                {profile.bio && (
                    <>
                        <h3 className="mt-6 text-sm font-semibold">
                            Bio
                        </h3>

                        <p className="mt-1 whitespace-pre-line text-sm text-slate-700">
                            {profile.bio}
                        </p>
                    </>
                )}

                {skillList(profile.skills).length > 0 && (
                    <>
                        <h3 className="mt-6 text-sm font-semibold">
                            Skills
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2">
                            {skillList(profile.skills).map((skill) => (
                                <span key={skill} className="chip">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <ConfirmDialog
                open={confirmDelete}
                title="Delete your profile?"
                message="This permanently removes your profile details. You can create a new one later."
                busy={busy}
                onConfirm={remove}
                onCancel={() => setConfirmDelete(false)}
            />
        </>
    );
}

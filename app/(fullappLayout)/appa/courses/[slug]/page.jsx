"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { 
    FaStar, FaClock, FaBookOpen, FaLaptopCode, FaUserGraduate, FaCertificate, FaChevronDown, FaChevronUp 
} from "react-icons/fa";
import { IoDiamond, IoBulbSharp } from "react-icons/io5";

// ===== COLOR SCHEMA =====
const PRIMARY_ACCENT = "#00BCD4"; // Cyan
const SECONDARY_ACCENT = "#14b8a6"; // Emerald
const DARK_BG = "bg-slate-950"; // Darker background
const LIGHT_TEXT = "text-gray-100";
const CARD_BG = "bg-slate-900"; // Slightly lighter card background
const BORDER_COLOR = "border-cyan-800/50"; // Cyan border

// ডামি মেনটর ডেটা (আপনার API থেকে এটি আনার ব্যবস্থা করতে হবে)
const DUMMY_MENTOR = {
    name: "A. Khan",
    title: "Senior Full Stack Dev",
    photo: "https://i.pravatar.cc/150?img=4",
    experience: "8+ Years",
};

// অ্যাকর্ডিয়ন কম্পোনেন্ট
const AccordionItem = ({ title, content, isOpen, onClick }) => (
    <div className={`border-b ${BORDER_COLOR}`}>
        <button
            className="flex justify-between items-center w-full py-4 px-5 text-left text-lg font-semibold transition duration-300 hover:bg-cyan-900/30"
            onClick={onClick}
            style={{ color: isOpen ? PRIMARY_ACCENT : LIGHT_TEXT }}
        >
            {title}
            {isOpen ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
        </button>
        <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100 p-5' : 'max-h-0 opacity-0 px-5'
            }`}
        >
            <p className="text-gray-300">{content}</p>
        </div>
    </div>
);


export default function CourseDetailsPage() {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openCurriculumIndex, setOpenCurriculumIndex] = useState(null); // Accordion state

    const sarvaUrl = "https://neolearnfull-backend-1.onrender.com"; // আপনার সার্ভার ইউআরএল

    useEffect(() => {
        if (!slug) return;

        const fetchCourse = async () => {
            try {
                const res = await axios.get(`${sarvaUrl}/api/course/slug/${slug}`);
                // API ডেটা যদি অ্যা
                setCourse({ 
                    ...res.data.data,
                    // ডামি ডেটা (API এ না থাকলে)
                    level: res.data.data.level || 'Intermediate',
                    rating: res.data.data.rating || 4.7,
                    isCertified: true,
                });
            } catch (err) {
                setError("Failed to load course details. Check API path.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [slug]);

    const toggleCurriculum = (index) => {
        setOpenCurriculumIndex(openCurriculumIndex === index ? null : index);
    };

    // ===== LOADING / ERROR / NO DATA States (পূর্বের মতোই) =====
    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${DARK_BG} text-cyan-400 text-xl font-bold`}>
                Loading course details...
            </div>
        );
    }
    if (error || !course) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${DARK_BG} text-red-400 text-xl`}>
                {error || "Course not found"}
            </div>
        );
    }
    
    // কারিকুলাম যদি শুধু স্ট্রিং এর Array হয়, তবে তাকে মডিউল আকারে দেখানো
    const structuredCurriculum = (course.curriculum || []).map((item, index) => ({
        id: index,
        title: `Module ${index + 1}: ${item}`,
        content: `Detailed lecture and project covering the topic: ${item}.`
    }));


    return (
        <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} p-6 sm:p-10`}>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                
                {/* --- LEFT CONTENT (Details) --- */}
                <div className="md:col-span-2 space-y-8">
                    
                    {/* HEADER SECTION */}
                    <header className="space-y-3">
                        <h1
                            className="text-5xl font-extrabold leading-tight"
                            style={{ color: PRIMARY_ACCENT }}
                        >
                            {course.title}
                        </h1>
                        <p className="text-lg text-gray-400 font-medium">{course.courseOverview}</p>

                        {/* RATING & FEATURES BAR */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-gray-700/50">
                            <FeatureItem icon={FaStar} label={`${course.rating} Rating`} value="Excellent" color="text-yellow-400" />
                            <FeatureItem icon={IoDiamond} label="Level" value={course.level} color="text-fuchsia-400" />
                            <FeatureItem icon={FaCertificate} label="Certification" value={course.isCertified ? "Yes" : "No"} color="text-emerald-400" />
                            <FeatureItem icon={FaUserGraduate} label="Enrollments" value="5K+" color="text-sky-400" />
                        </div>
                    </header>

                    {/* COURSE DETAILS / WHAT YOU WILL LEARN */}
                    <SectionCard title="What You Will Learn">
                        <p className="text-gray-300 mb-4">{course.details}</p>
                        {/* Example of key benefits list */}
                        <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-300 mt-4">
                            {['Master core syntax', 'Build 5 real-world projects', 'Deploy applications to live server', 'Advanced state management'].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <IoBulbSharp className="text-md" style={{ color: PRIMARY_ACCENT }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </SectionCard>


                    {/* CURRICULUM (Accordion Style) */}
                    <SectionCard title="Detailed Course Curriculum">
                        <div className="divide-y divide-gray-700/50">
                            {structuredCurriculum.map((item, index) => (
                                <AccordionItem
                                    key={item.id}
                                    title={item.title}
                                    content={item.content}
                                    isOpen={openCurriculumIndex === index}
                                    onClick={() => toggleCurriculum(index)}
                                />
                            ))}
                        </div>
                    </SectionCard>
                    
                    {/* MENTOR SECTION */}
                    <SectionCard title="Meet Your Mentor" icon={FaUserGraduate}>
                        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
                            <img
                                src={DUMMY_MENTOR.photo}
                                alt={DUMMY_MENTOR.name}
                                className="w-20 h-20 rounded-full object-cover border-2 border-emerald-400"
                            />
                            <div>
                                <h4 className="text-xl font-bold text-cyan-400">{DUMMY_MENTOR.name}</h4>
                                <p className="text-gray-300">{DUMMY_MENTOR.title}</p>
                                <p className="text-sm text-gray-400">Experience: {DUMMY_MENTOR.experience}</p>
                            </div>
                        </div>
                    </SectionCard>

                </div>

                {/* --- RIGHT SIDEBAR (Pricing & Enroll) --- */}
                <div className="space-y-8">
                    
                    {/* COURSE PRICING CARD */}
                    <div className={`${CARD_BG} p-8 rounded-2xl shadow-2xl border-4 ${BORDER_COLOR}`}>
                        <img
                            src={course.image || 'https://via.placeholder.com/600x300?text=Course+Image'}
                            alt={course.title}
                            className="rounded-xl mb-6 w-full h-48 object-cover shadow-lg"
                        />

                        <h3 className="text-2xl font-extrabold mb-2">Total Fee</h3>
                        <p className="text-4xl font-black mb-6">
                            ৳ <span style={{ color: SECONDARY_ACCENT }}>{course.fee}</span>
                        </p>

                        <div className="space-y-2 text-gray-300 text-base">
                            <InfoRow icon={FaClock} label="Duration" value={`${course.durationMonth} Months`} />
                            <InfoRow icon={FaBookOpen} label="Lectures" value={`${course.lectures} Classes`} />
                            <InfoRow icon={FaLaptopCode} label="Projects" value={`${course.totalProject} Real-World`} />
                            <InfoRow icon={FaUserGraduate} label="Technology" value={course.technology} />
                        </div>

                        <button
                            className="w-full mt-8 py-4 rounded-xl text-lg font-extrabold text-white transition-transform duration-300 hover:scale-[1.02] shadow-cyan-900/50 shadow-xl"
                            style={{
                                background: `linear-gradient(to right, ${PRIMARY_ACCENT}, ${SECONDARY_ACCENT})`,
                            }}
                        >
                            Enroll Now & Start Learning
                        </button>
                    </div>

                    {/* JOB POSITIONS */}
                    <SectionCard title="Career Opportunities" icon={IoDiamond}>
                        <ul className="space-y-3">
                            {course.jobPositions.map((job, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg font-medium text-gray-300 border-l-4 border-emerald-500"
                                >
                                    {job}
                                </li>
                            ))}
                        </ul>
                    </SectionCard>
                </div>
            </div>
        </div>
    );
}

// --- Helper Components ---

const FeatureItem = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center gap-2">
        <Icon className={`text-xl ${color}`} />
        <div>
            <p className="text-sm font-semibold text-gray-400">{label}</p>
            <p className="text-md font-bold">{value}</p>
        </div>
    </div>
);

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex justify-between items-center py-1">
        <span className="flex items-center gap-2 font-medium">
            <Icon className="text-lg" style={{ color: PRIMARY_ACCENT }} /> {label}
        </span>
        <span className="font-semibold text-white">{value}</span>
    </div>
);

const SectionCard = ({ title, children, icon: Icon }) => (
    <div className={`${CARD_BG} p-6 rounded-xl border ${BORDER_COLOR}`}>
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3" style={{ color: PRIMARY_ACCENT }}>
            {Icon && <Icon className="text-2xl" />}
            {title}
        </h2>
        {children}
    </div>
);
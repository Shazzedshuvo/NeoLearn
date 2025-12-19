// src/app/admin/layout.js (সঠিক ফাইল নাম)

import { AdminDashbord } from "./component/AdminDashbord";
import { MentorListComponent } from "./component/MentorListComponent";



// Next.js App Router-এর জন্য, layout কম্পোনেন্ট একটি ডিফল্ট এক্সপোর্ট হওয়া আবশ্যক।
// এটি সাধারণত children প্রপস নেয়। 

// এখানে আপনি AdminDashbord কম্পোনেন্টটিকে সরাসরি লেআউট হিসাবে ব্যবহার করতে পারেন, 
// অথবা লেআউটের ভেতরে AdminDashbord-কে রেন্ডার করতে পারেন।

export default function AdminLayout({ children }) {
  return (
    // ধরে নিলাম AdminDashbord কম্পোনেন্টটি পুরো লেআউট ম্যানেজ করে,
    // এবং এটি children (Page content) রেন্ডার করার জন্য ডিজাইন করা হয়েছে।
    <AdminDashbord>
        <MentorListComponent></MentorListComponent>
        {children}
    </AdminDashbord>
  );
}

// দ্রষ্টব্য: যদি আপনার AdminDashbord কম্পোনেন্টটি কোনো children প্রপস না নেয়, 
// তবে আপনাকে এটিকে কেবল পেজ কন্টেন্ট হিসাবে ব্যবহার করতে হবে, লেআউট হিসাবে নয়।
// 'adminDashbord' কম্পোনেন্টটি আপনার কম্পোনেন্ট ফাইল থেকে Named Export (const AdminDashbord) হচ্ছে।
// তাই এখানে আপনাকে এটিকে Named Import করতে হবে।

import { AdminDashbord } from "./component/AdminDashbord";
import { MentorListComponent } from "./component/MentorListComponent";

export default function AdminPage() {
    return (
<div>
  <AdminDashbord />

    <MentorListComponent></MentorListComponent>
</div>
      
        
    );
}
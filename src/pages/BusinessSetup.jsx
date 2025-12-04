import React, { useState } from "react";
import { Save, CheckCircle2, Loader2 } from "lucide-react";

const businessCategories = [
  "Salon & Beauty",
  "Fitness & Gym",
  "Car/Motorbike Service",
  "Doctor & Clinic",
  "Plumber / Electrician",
  "Hotels & PG",
  "Home Cleaning",
  "Catering",
  "Tutoring & Coaching",
  "Event Management"
];

export default function BusinessSetup() {
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    whatsapp: "",
    email: "",
    category: "",
    subcategory: "",
    address: "",
    city: "",
    pincode: "",
    latitude: "",
    longitude: "",
    gst: "",
    licenceId: "",
    description: "",
    openTime: "",
    closeTime: "",
    weekday: "Mon-Sun",
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setLoading(true);
    setSaved(false);

    setTimeout(() => {
      setLoading(false);
      setSaved(true);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Business Setup</h1>

        {saved && (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <CheckCircle2 size={20} /> Saved Successfully
          </div>
        )}
      </div>

      {/* MAIN BOX */}
      <div className="bg-white shadow-md rounded-xl border border-slate-200 p-8 space-y-6">
        {/* BUSINESS NAME */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Business Name *</label>
            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="e.g., Royal Men's Salon"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Owner Name *</label>
            <input
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
        </section>

        {/* CONTACT DETAILS */}
        <h2 className="font-semibold text-lg text-slate-700">Contact Details</h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp</label>
            <input
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
        </section>

        {/* CATEGORY */}
        <h2 className="font-semibold text-lg text-slate-700">Business Category</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            >
              <option value="">Select Category</option>
              {businessCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subcategory (optional)</label>
            <input
              name="subcategory"
              value={form.subcategory}
              onChange={handleChange}
              placeholder="e.g., Makeup, Haircut, Physiotherapy"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
        </section>

        {/* ADDRESS */}
        <h2 className="font-semibold text-lg text-slate-700">Business Address</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Address *</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, Road, Landmark"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City *</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Pincode *</label>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="XXXXXX"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <input
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="Auto / Manual"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Longitude</label>
            <input
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="Auto / Manual"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
        </section>

        {/* HOURS */}
        <h2 className="font-semibold text-lg text-slate-700">Opening Hours</h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Day Range</label>
            <select
              name="weekday"
              value={form.weekday}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            >
              <option>Mon–Sun</option>
              <option>Mon–Sat</option>
              <option>Only Weekends</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Open Time</label>
            <input
              type="time"
              name="openTime"
              value={form.openTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Close Time</label>
            <input
              type="time"
              name="closeTime"
              value={form.closeTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
        </section>

        {/* EXTRA VERIFICATION */}
        <h2 className="font-semibold text-lg text-slate-700">Verification (Optional)</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">GST Number</label>
            <input
              name="gst"
              value={form.gst}
              onChange={handleChange}
              placeholder="e.g., 22AAAAA0000A1Z5"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trade License / Service ID</label>
            <input
              name="licenceId"
              value={form.licenceId}
              onChange={handleChange}
              placeholder="Business Identification Number"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600"
            />
          </div>
        </section>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1">Business Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell customers about your services, experience, specialties..."
            rows={4}
            className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-600 resize-none"
          ></textarea>
        </div>
      </div>

      {/* SAVE BUTTONS */}
      <div className="flex justify-end gap-3 mt-8">
        <button className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100">
          Save Draft
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 flex items-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

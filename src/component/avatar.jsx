function Avatar({ user, size = 35 }) {
  const colors = [
    "from-blue-500 to-purple-700",
    "from-emerald-400 to-teal-700",
    "from-rose-400 to-pink-700",
    "from-amber-400 to-orange-600",
    "from-violet-500 to-purple-700",
  ];
  
  // username ke pehle letter se color pick hoga — har user ka alag color!
  const color = colors[user?.username?.charCodeAt(0) % colors.length];

  return user?.profilepic ? (
    <img
      src={user.profilepic}
      style={{ width: size, height: size }}
      className="rounded-full object-cover shrink-0 shadow-sm"
      alt=""
    />
  ) : (
    <div
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className={`rounded-full bg-linear-to-br ${color} flex items-center justify-center text-white font-bold select-none shrink-0`}
    >
      {user?.username?.[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

export default Avatar
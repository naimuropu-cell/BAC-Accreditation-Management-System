export const requireRole = (allowedRoles) => (req, res, next) => {
    const user = req.user; // user info from JWT
    if (!user) return res.status(401).json({ ok: false, message: "Unauthorized" });
  
    // Admin can do everything
    if (user.role === "admin") return next();
  
    // Other roles can only act on their own role
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ ok: false, message: "Forbidden: insufficient role" });
    }
  
    next();
  };
  
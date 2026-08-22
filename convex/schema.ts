import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    stripeCustomerId: v.string(),
    currentSubscriptionId: v.optional(v.id("subscriptions")),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_stripeCustomerId", ["stripeCustomerId"])
    .index("by_currentSubscriptionId", ["currentSubscriptionId"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    stripeSubscriptionId: v.string(),
    status: v.string(),
    planType: v.union(v.literal("month"), v.literal("year")),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
  }).index("by_stripeSubscriptionId", ["stripeSubscriptionId"]),

  courses: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    price: v.number(),
  }),

  purchases: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    stripePurchaseId: v.string(),
    amount: v.number(),
    purchaseDate: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_stripePurchaseId", ["stripePurchaseId"])
    .index("by_userId_and_courseId", ["userId", "courseId"]),
});
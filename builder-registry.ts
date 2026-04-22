"use client";
import { builder, Builder } from "@builder.io/react";
import { Button } from "./components/ui/button";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Button, {
  name: "My Button",
});

Builder.registerComponent(Builder, {
  name: "Builder",
});


import React from 'react';
import { updates } from "@/data/updates";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UpdatesSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Updates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're constantly adding new tools and improving our platform.
            Stay up to date with our latest additions.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-secondary/60">
          <div className="p-6">
            <ul className="space-y-4">
              {updates.map((update, index) => (
                <li key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-sm font-medium text-primary">{update.date}:</span>
                  <span className="text-muted-foreground">{update.content}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Button variant="outline">View All Updates</Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default UpdatesSection;

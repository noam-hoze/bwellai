import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, X, Calendar, Eye, User, Heart, Hand, Activity, Stethoscope } from "lucide-react";
import { ScanResult } from "@/types/scanResults";

interface ScanResultModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: ScanResult | null;
}

const ScanResultModal = ({ open, onOpenChange, result }: ScanResultModalProps) => {
  if (!result) return null;

  const getCategoryIcon = () => {
    return result.category === 'optimal' ? (
      <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
    ) : (
      <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
    );
  };

  const getCategoryColor = () => {
    return result.category === 'optimal' ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200';
  };

  const getCategoryBadgeColor = () => {
    return result.category === 'optimal' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  };

  // Eye Analysis specific content with new friendly styling
  const renderEyeAnalysisContent = () => {
    return (
      <div className="p-4 md:p-6">
        <Tabs defaultValue="snapshot" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50 border-b border-gray-200">
            <TabsTrigger 
              value="snapshot" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ 
                color: '#294829'
              }}
            >
              <span className="hidden sm:inline">Eye Health Snapshot</span>
              <span className="sm:hidden">Snapshot</span>
            </TabsTrigger>
            <TabsTrigger 
              value="around" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
            >
              <span className="hidden sm:inline">Around the Eyes</span>
              <span className="sm:hidden">Around</span>
            </TabsTrigger>
            <TabsTrigger 
              value="habits" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
            >
              <span className="hidden sm:inline">Easy Eye Habits</span>
              <span className="sm:hidden">Habits</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="snapshot" className="mt-6 space-y-6">
            {/* Friendly Intro */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-2xl border-l-4 border-green-500 text-center">
              <p className="text-green-800 text-lg font-medium leading-relaxed">
                Your eyes are sparkling with health! Let's explore what they're telling us!
              </p>
            </div>

            {/* Eye Health Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Whites of eyes
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Clear and bright. No signs of irritation or yellowing.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Iris & pupil
                </h4>
                <p className="text-sm text-gray-700">Even color, reactive pupils = healthy vision.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Cornea & moisture
                </h4>
                <p className="text-sm text-gray-700">Smooth and hydrated—no dryness here.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Conjunctiva
                </h4>
                <p className="text-sm text-gray-700">Calm and moist, not inflamed.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="around" className="mt-6 space-y-6">
            {/* Around Eyes Section */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Around the Eyes
              </h3>
              <p className="text-orange-800 text-sm mb-4">
                The skin around your eyes tells its own story about your overall wellness:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border-l-3 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Eyelids
                  </h4>
                  <p className="text-sm text-gray-700">Move naturally, no droop or tension.</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border-l-3 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Under-eye area
                  </h4>
                  <p className="text-sm text-gray-700">Minimal circles and nice elasticity.</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border-l-3 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Skin tone & texture
                  </h4>
                  <p className="text-sm text-gray-700">Even color and smooth texture.</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border-l-3 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    No puffiness
                  </h4>
                  <p className="text-sm text-gray-700">Everything looks refreshed and balanced.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="habits" className="mt-6 space-y-6">
            {/* Eye Habits Section */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy Eye Habits
              </h3>

              <div className="space-y-3">
                <div className="bg-white bg-opacity-70 p-4 rounded-xl border-l-3 border-blue-600 flex items-start gap-3">
                  <span className="text-gray-700 text-sm">Use the 20-20-20 rule during screen time.</span>
                </div>

                <div className="bg-white bg-opacity-70 p-4 rounded-xl border-l-3 border-blue-600 flex items-start gap-3">
                  <span className="text-gray-700 text-sm">Stay hydrated to support tear health.</span>
                </div>

                <div className="bg-white bg-opacity-70 p-4 rounded-xl border-l-3 border-blue-600 flex items-start gap-3">
                  <span className="text-gray-700 text-sm">Get solid sleep—your eyes will thank you.</span>
                </div>

                <div className="bg-white bg-opacity-70 p-4 rounded-xl border-l-3 border-blue-600 flex items-start gap-3">
                  <span className="text-gray-700 text-sm">Eat eye-friendly foods (like omega-3s and leafy greens).</span>
                </div>

                <div className="bg-white bg-opacity-70 p-4 rounded-xl border-l-3 border-blue-600 flex items-start gap-3">
                  <span className="text-gray-700 text-sm">Keep up with yearly eye checkups.</span>
                </div>
              </div>
            </div>

            {/* Celebration Footer */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-2xl border-l-4 border-green-500 text-center">
              <p className="text-green-800 text-lg font-medium leading-relaxed">
                Bright, balanced eyes = strong health signals. You're looking good!
              </p>
            </div>

            {/* Friendly Disclaimer */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 p-4 rounded-xl text-center">
              <p className="text-orange-800 text-sm leading-relaxed">
                This fun analysis is for curiosity and wellness exploration. For any health questions, always chat with your healthcare provider!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Tongue Analysis specific content
  const renderTongueAnalysisContent = () => {
    return (
      <div className="p-4 md:p-6">
        <Tabs defaultValue="observation" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50 border-b border-gray-200">
            <TabsTrigger 
              value="observation" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <span className="hidden sm:inline">What We See</span>
              <span className="sm:hidden">Observation</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tcm" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <span className="hidden sm:inline">Eastern Wisdom (TCM)</span>
              <span className="sm:hidden">TCM</span>
            </TabsTrigger>
            <TabsTrigger 
              value="care" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <span className="hidden sm:inline">What You Can Do</span>
              <span className="sm:hidden">Care</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="observation" className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-2xl border-l-4 border-green-500 text-center">
              <p className="text-green-800 text-lg font-medium leading-relaxed">
                Your tongue is telling us some wonderful stories about your health! Let's explore together!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Color
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>A healthy pink means good blood flow and oxygen levels.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Coating
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Just a light layer. Totally normal.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Hydration
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Your tongue looks well-hydrated—no dryness here.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Shape
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Symmetrical and toned—great muscle control.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Cracks?
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>None. Tissue looks strong.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Texture
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>All papillae look healthy and well-distributed.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tcm" className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Eastern Wisdom (TCM View)
              </h3>
              <p className="text-purple-800 text-sm mb-4">
                In Traditional Chinese Medicine, different parts of your tongue connect to different organs. Here's what yours is sharing:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3">
                  <h4 className="font-semibold mb-2" style={{ color: '#2d4c2b' }}>
                    Heart & Lungs (tip)
                  </h4>
                  <p className="text-sm" style={{ color: '#022406' }}>Healthy color = good circulation.</p>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3">
                  <h4 className="font-semibold mb-2" style={{ color: '#2d4c2b' }}>
                    Liver & Gallbladder (edges)
                  </h4>
                  <p className="text-sm" style={{ color: '#022406' }}>Smooth and balanced.</p>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3">
                  <h4 className="font-semibold mb-2" style={{ color: '#2d4c2b' }}>
                    Digestion (center)
                  </h4>
                  <p className="text-sm" style={{ color: '#022406' }}>Coating and color show your stomach and spleen are doing well.</p>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3">
                  <h4 className="font-semibold mb-2" style={{ color: '#2d4c2b' }}>
                    Kidneys (root)
                  </h4>
                  <p className="text-sm" style={{ color: '#022406' }}>Looks moist and vital—no signs of deficiency.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="care" className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What You Can Do
              </h3>

              <div className="space-y-3">
                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3 flex items-start gap-3">
                  <span className="text-sm" style={{ color: '#022406' }}>Keep your tongue clean—your current hygiene routine is working.</span>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3 flex items-start gap-3">
                  <span className="text-sm" style={{ color: '#022406' }}>Stay hydrated and eat a balanced diet.</span>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3 flex items-start gap-3">
                  <span className="text-sm" style={{ color: '#022406' }}>Consider trying TCM tongue exercises or mindful eating rituals.</span>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3 flex items-start gap-3">
                  <span className="text-sm" style={{ color: '#022406' }}>No concerns spotted, just simple steps to keep things on track.</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-2xl border-l-4 border-green-500 text-center">
              <p className="text-green-800 text-lg font-medium leading-relaxed">
                Your tongue reflects good internal balance—keep up the great care!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Handwriting Analysis specific content
  const renderHandwritingAnalysisContent = () => {
    return (
      <div className="p-4 md:p-6">
        <Tabs defaultValue="health" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50 border-b border-gray-200">
            <TabsTrigger 
              value="health" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <span className="hidden sm:inline">Health Signals</span>
              <span className="sm:hidden">Health</span>
            </TabsTrigger>
            <TabsTrigger 
              value="style" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <span className="hidden sm:inline">Writing Style</span>
              <span className="sm:hidden">Style</span>
            </TabsTrigger>
            <TabsTrigger 
              value="personality" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <span className="hidden sm:inline">Personality</span>
              <span className="sm:hidden">You</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tips" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <span className="hidden sm:inline">Tips</span>
              <span className="sm:hidden">Tips</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-2xl border-l-4 border-green-500 text-center">
              <p className="text-green-800 text-lg font-medium leading-relaxed">
                Great news! Your handwriting shows some really positive health signals. Let's dive in!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Steady hands
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Your writing shows smooth, controlled strokes. That's a sign of good coordination.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  No tremors or shakes
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>The pen moves cleanly across the page. No signs of neurological concerns.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Clear thinking
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Your writing stays consistent without signs of mental fatigue.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Balanced mood
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>The even pressure and form show emotional steadiness.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="style" className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 rounded-2xl border-l-4 border-orange-500 text-center">
              <p className="text-orange-800 text-lg font-medium leading-relaxed">
                Your writing style tells such an interesting story about who you are!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Size & slant
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Medium-sized with a gentle right lean = practical, warm, and future-focused.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Pressure
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Just right! Shows good energy and emotional balance.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Flow & rhythm
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Your writing flows smoothly, suggesting sharp focus.</p>
              </div>

              <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200">
                <h4 className="font-semibold mb-3" style={{ color: '#2d4c2b' }}>
                  Spacing & alignment
                </h4>
                <p className="text-sm" style={{ color: '#022406' }}>Neat spacing and even lines = great organization and clear thinking.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personality" className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What Your Personality Shines Through
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3">
                  <h4 className="font-semibold mb-2" style={{ color: '#2d4c2b' }}>
                    Authentic self
                  </h4>
                  <p className="text-sm" style={{ color: '#022406' }}>Your signature matches your regular writing. You're consistent and real.</p>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3">
                  <h4 className="font-semibold mb-2" style={{ color: '#2d4c2b' }}>
                    Confident communicator
                  </h4>
                  <p className="text-sm" style={{ color: '#022406' }}>Clear letters show transparency and self-assurance.</p>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3">
                  <h4 className="font-semibold mb-2" style={{ color: '#2d4c2b' }}>
                    Even temperament
                  </h4>
                  <p className="text-sm" style={{ color: '#022406' }}>No signs of emotional suppression or impulsiveness.</p>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3">
                  <h4 className="font-semibold mb-2" style={{ color: '#2d4c2b' }}>
                    Socially balanced
                  </h4>
                  <p className="text-sm" style={{ color: '#022406' }}>Your writing reflects healthy boundaries and emotional awareness.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Gentle Recommendations Just for You
              </h3>

              <div className="space-y-3">
                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3 flex items-start gap-3">
                  <span className="text-sm" style={{ color: '#022406' }}>Keep doing what works! You show strong focus and emotional steadiness.</span>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3 flex items-start gap-3">
                  <span className="text-sm" style={{ color: '#022406' }}>Try journaling or sketching to explore your creative side.</span>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3 flex items-start gap-3">
                  <span className="text-sm" style={{ color: '#022406' }}>You're mentally organized—maybe try new learning tools to build on that.</span>
                </div>

                <div style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }} className="p-4 rounded-xl border-l-3 flex items-start gap-3">
                  <span className="text-sm" style={{ color: '#022406' }}>Your handwriting suggests a healthy body-mind connection. Keep nurturing that balance!</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-2xl border-l-4 border-green-500 text-center">
              <p className="text-green-800 text-lg font-medium leading-relaxed">
                Your handwriting tells a beautiful story of balance, focus, and authenticity. Keep being your wonderful self!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Nail Analysis specific content
  const renderNailAnalysisContent = () => {
    return (
      <div className="p-4 md:p-6">
        <Tabs defaultValue="structure" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50 border-b border-gray-200">
            <TabsTrigger 
              value="structure" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <Hand className="h-4 w-4" />
              <span className="hidden sm:inline">Nail Structure</span>
              <span className="sm:hidden">Structure</span>
            </TabsTrigger>
            <TabsTrigger 
              value="circulation" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Circulation & Health</span>
              <span className="sm:hidden">Health</span>
            </TabsTrigger>
            <TabsTrigger 
              value="recommendations" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">Recommendations</span>
              <span className="sm:hidden">Care</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="structure" className="mt-6 space-y-6">
            {/* Nail Plate Assessment Section */}
            <Card style={{ backgroundColor: '#f0f3ea', borderColor: '#123c14' }} className="border-l-4">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl" style={{ color: '#2d4c2b' }}>Nail Plate Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Color</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Healthy pink coloration with good blood circulation, no signs of yellowing or discoloration</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Texture</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Smooth surface texture with normal shine and flexibility</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Thickness</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Appropriate thickness indicating good nail health and nutrition</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Surface Contour</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Minor vertical ridges present, typical for age group, no significant pitting or abnormal grooves</p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Shape</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Normal curved shape with healthy growth pattern and symmetrical appearance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="circulation" className="mt-6 space-y-6">
            {/* Nail Bed Health Section */}
            <Card style={{ backgroundColor: '#f0f3ea', borderColor: '#123c14' }} className="border-l-4">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl" style={{ color: '#2d4c2b' }}>Nail Bed Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Capillary Refill & Blood Flow</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Good blood flow with normal capillary refill time, indicating healthy circulation</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Lunula (Half-moon)</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Visible half-moon area with appropriate size and coloration</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nail Fold & Cuticle Assessment Section */}
            <Card style={{ backgroundColor: '#f0f3ea', borderColor: '#123c14' }} className="border-l-4">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl" style={{ color: '#2d4c2b' }}>Nail Fold & Cuticle Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Inflammation or Swelling</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>No signs of inflammation or swelling around nail fold area</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Cuticle Condition</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Healthy cuticle condition with normal moisture levels and no signs of infection</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth & Attachment Section */}
            <Card style={{ backgroundColor: '#f0f3ea', borderColor: '#123c14' }} className="border-l-4">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl" style={{ color: '#2d4c2b' }}>Growth & Attachment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Growth Pattern</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Normal growth pattern with consistent rate and direction</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Attachment & Separation</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Secure nail attachment with no signs of detachment or separation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Significance Section */}
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500">
              <CardHeader>
                <CardTitle className="text-base md:text-lg text-green-800">Health Significance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm md:text-base">
                  Your nail characteristics indicate excellent systemic health. The visible lunula suggests good circulation, while the healthy pink color reflects adequate hemoglobin levels and oxygen transport.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6 space-y-6">
            {/* Overall Assessment */}
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500">
              <CardContent className="p-4">
                <p className="text-green-700 font-medium text-sm md:text-base">
                  Overall nail health assessment indicates good circulation and nail integrity. Continue current nail care routine and maintain proper nutrition.
                </p>
              </CardContent>
            </Card>

            {/* Maintenance Recommendations */}
            <Card style={{ backgroundColor: '#f0f3ea', borderColor: '#123c14' }} className="border-l-4">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl" style={{ color: '#2d4c2b' }}>Maintenance Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Nail Care Routine</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Continue current nail care practices including regular trimming and cuticle care</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Nutritional Support</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Maintain balanced diet rich in biotin, protein, and essential vitamins</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Hydration</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Keep nails and cuticles moisturized with appropriate nail oils or creams</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Protection</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Use gloves during household chores and harsh chemical exposure</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Regular Monitoring</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Track nail health monthly to observe long-term changes and patterns</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold" style={{ color: '#2d4c2b' }}>Professional Care</h4>
                    <p className="text-sm" style={{ color: '#022406' }}>Consider periodic professional manicures for optimal nail health maintenance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Disclaimer */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-500">
              <CardHeader>
                <CardTitle className="text-base text-orange-800">Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 text-sm">
                  This analysis is for experimental purposes only and should not replace professional medical advice. Please consult with a healthcare provider for any health concerns.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Generic content for other scan types (fallback)
  const renderGenericContent = () => {
    return (
      <div className="space-y-4 md:space-y-6 p-4 md:p-6">
        {/* Description */}
        <Card className={`${getCategoryColor()} border-2`}>
          <CardContent className="p-3 md:p-4">
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">{result.description}</p>
          </CardContent>
        </Card>

        {/* Western Medical Insights */}
        <Card>
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-base md:text-lg text-blue-800">Western Medical Insights</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              {result.westernInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{insight.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Traditional Medicine Insights */}
        <Card>
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-base md:text-lg text-purple-800">Traditional Medicine Insights</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              {result.traditionalInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{insight.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-base md:text-lg text-green-800">Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2 mb-4">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{recommendation.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl h-full max-h-screen md:max-h-[90vh] overflow-y-auto p-0 md:p-6 rounded-2xl">
        <DialogHeader className="border-b pb-3 md:pb-4 px-6 py-5 md:p-0 rounded-t-2xl relative" style={{ backgroundColor: '#2d4b2c' }}>
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-3 md:gap-0 pl-2.5">
            <div className="flex items-start md:items-center gap-2 md:gap-3 w-full md:w-auto">
              <div className="flex-1 md:flex-none">
                <DialogTitle className="text-xl md:text-2xl font-bold leading-tight flex items-center gap-2 mb-2 text-white">
                  {result.type === 'eye' ? (
                    <>
                      <Eye className="h-6 w-6" /> Your Eye Health Story
                    </>
                  ) : result.type === 'nail' ? (
                    <>
                      <Hand className="h-6 w-6" /> Fingernail Analysis Results
                    </>
                  ) : result.type === 'tongue' ? (
                    <>
                      <Heart className="h-6 w-6" /> Your Tongue Health Story
                    </>
                  ) : result.type === 'handwriting' ? (
                    <>
                      <User className="h-6 w-6" /> Your Handwriting Story
                    </>
                  ) : (
                    result.title
                  )}
                </DialogTitle>
                <p className="text-white/90 text-sm md:text-base mb-4">
                  {result.type === 'eye' ? 'Windows to your beautiful soul and health!' : 
                   result.type === 'nail' ? 'Comprehensive analysis of your nail health indicators' : 
                   result.type === 'tongue' ? 'A window into your body\'s wisdom!' :
                   result.type === 'handwriting' ? 'What your writing reveals about your amazing self!' :
                   ''}
                </p>
                <div className="flex items-start md:items-center gap-3 flex-col md:flex-row">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm text-white">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                    <span>{result.category === 'optimal' ? 'Bright and beautiful!' : 'Watchful Insights'}</span>
                  </div>
                  <span className="text-xs md:text-sm text-white/80 flex items-center gap-1">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                    {result.timestamp.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)} 
              className="flex-shrink-0 text-white hover:bg-white/20 absolute top-4 right-4 w-9 h-9 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {result.type === 'eye' ? renderEyeAnalysisContent() : 
         result.type === 'nail' ? renderNailAnalysisContent() : 
         result.type === 'tongue' ? renderTongueAnalysisContent() :
         result.type === 'handwriting' ? renderHandwritingAnalysisContent() :
         renderGenericContent()}
      </DialogContent>
    </Dialog>
  );
};

export default ScanResultModal;

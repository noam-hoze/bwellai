import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, X, Calendar, Eye, User, Heart, Hand, Activity, Stethoscope, Search, HeartPulse, Leaf, CircleDashed } from "lucide-react";
import { ScanResult } from "@/types/scanResults";
import { InsightCard } from "./InsightCard";

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

  const getStatusColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-400";
      case "orange":
        return "bg-orange-400";
      case "red":
        return "bg-red-400";
      case "yellow":
        return "bg-yellow-400";
      case "blue":
        return "bg-blue-400";
      default:
        return "bg-gray-400";
    }
  };

  const bannerColorMap = {
    celebration: {
      from: 'from-green-50',
      to: 'to-green-100',
      border: 'border-green-500',
      text: 'text-green-800',
    },
    alert: {
      from: 'from-red-50',
      to: 'to-red-100',
      border: 'border-red-500',
      text: 'text-red-800',
    },
    caution: {
      from: 'from-orange-50',
      to: 'to-orange-100',
      border: 'border-orange-500',
      text: 'text-orange-800',
    },
    attantion: {
      from: 'from-red-50',
      to: 'to-red-100',
      border: 'border-red-500',
      text: 'text-red-800',
    },
    neutral: {
      from: 'from-orange-50',
      to: 'to-orange-100',
      border: 'border-orange-500',
      text: 'text-orange-800',
    }
  };
  const bannerStyle = bannerColorMap[result.bannerType || 'celebration'];


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
              <span className="sm:hidden">Eye Health</span>
            </TabsTrigger>
            <TabsTrigger
              value="around"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
            >
              <span className="hidden sm:inline">Around the Eyes</span>
              <span className="sm:hidden">Around Eyes</span>
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
            {/* Banner */}
            <div
              className={`bg-gradient-to-r ${bannerStyle.from} ${bannerStyle.to} p-5 rounded-2xl border-l-4 ${bannerStyle.border} text-center`}
            >
              <p className={`${bannerStyle.text} text-lg font-medium leading-relaxed`}>
                {result.bannerText}
              </p>
            </div>


            {/* Eye Health Insights Grid */}
            <div className="flex flex-col gap-6">
              {result.data.eye_health_analysis?.findings?.map((finding, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl border-l-4 transition-transform duration-200"
                  style={{ backgroundColor: '#e8f6e7', borderLeftColor: '#123c14' }}
                >
                  {/* Title with icon */}
                  <h4 className="flex items-center gap-2 font-semibold text-green-900 mb-2 text-lg">
                    {finding.title}
                  </h4>

                  {/* Observation */}
                  <div className="flex items-center gap-2 text-sm font-medium text-green-800 mb-1">
                    <Search className="w-4 h-4" />
                    What we see:
                  </div>
                  <p className="text-sm text-green-900 mb-4">{finding.observation}</p>

                  {/* Insights */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <InsightCard
                      label="Allopathic Insight:"
                      content={finding.insights.allopathic}
                      icon={<HeartPulse className="w-4 h-4" />}
                      borderColor="#90cdf4" // blue-300
                    />
                    <InsightCard
                      label="Functional Insight:"
                      content={finding.insights.functional}
                      icon={<Leaf className="w-4 h-4" />}
                      borderColor="#68d391" // green-400
                    />
                    <InsightCard
                      label="TCM View:"
                      content={finding.insights.tcm}
                      icon={<CircleDashed className="w-4 h-4" />}
                      borderColor="#f687b3" // pink-400
                    />
                  </div>
                </div>

              ))}
            </div>


          </TabsContent>

          <TabsContent value="around" className="mt-6 space-y-6">
            <div>
              <div className="flex flex-col gap-6">
                {result.data.around_eyes_analysis?.findings?.map((finding, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl border-l-4 shadow-sm"
                    style={{ backgroundColor: '#e8f6e7', borderLeftColor: '#123c14' }}
                  >
                    {/* Title */}
                    <h4 className="flex items-center gap-2 font-semibold text-green-900 mb-2 text-lg">
                      {finding.title}
                    </h4>

                    {/* Observation */}
                    <div className="flex items-center gap-2 text-sm font-medium text-green-800 mb-1">
                      <Search className="w-4 h-4" />
                      What we see:
                    </div>
                    <p className="text-sm text-green-900 mb-4">{finding.observation}</p>

                    {/* Insights */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <InsightCard
                        label="Allopathic Insight:"
                        content={finding.insights.allopathic}
                        icon={<HeartPulse className="w-4 h-4" />}
                        borderColor="#90cdf4"
                      />
                      <InsightCard
                        label="Functional Insight:"
                        content={finding.insights.functional}
                        icon={<Leaf className="w-4 h-4" />}
                        borderColor="#68d391"
                      />
                      <InsightCard
                        label="TCM View:"
                        content={finding.insights.tcm}
                        icon={<CircleDashed className="w-4 h-4" />}
                        borderColor="#f687b3"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>


          <TabsContent value="habits" className="mt-6 space-y-6">
            {/* Eye Habits Section */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {result.data.tips_recommendations?.section_title}
              </h3>

              <div className="space-y-3">
                {result.data.tips_recommendations?.tips?.map((tip, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-70 p-4 rounded-xl "
                  >
                    <p className="text-blue-900 font-semibold text-sm mb-1">{tip.title}</p>
                    <p className="text-gray-700 text-sm">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Card */}
            {result.data.tips_recommendations?.summary && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-2xl border-l-4 border-green-500 text-center">
                <p className="text-green-800 text-lg font-medium leading-relaxed">
                  {result.data.tips_recommendations.summary.text}
                </p>
              </div>
            )}

            {/* Disclaimer */}
            {result.data.disclaimer && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 p-4 rounded-xl text-center">
                <p className="text-orange-800 text-sm leading-relaxed">
                  {result.data.disclaimer}
                </p>
              </div>
            )}
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
            <div
              className={`bg-gradient-to-r ${bannerStyle.from} ${bannerStyle.to} p-5 rounded-2xl border-l-4 ${bannerStyle.border} text-center`}
            >
              <p className={`${bannerStyle.text} text-lg font-medium leading-relaxed`}>
                {result.bannerText}
              </p>
            </div>


            <div className="flex flex-col gap-6">
              {result.data.western_analysis?.findings?.map((finding, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200 shadow-sm"
                  style={{
                    backgroundColor: '#f0f3ea',
                    borderLeftColor: '#123c14',
                  }}
                >
                  <h4 className="font-semibold mb-2 text-[15px]" style={{ color: '#2d4c2b' }}>
                    {finding.title}
                  </h4>
                  <p className="text-sm mb-2" style={{ color: '#022406' }}>
                    {finding.observation}
                  </p>
                  <p
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: finding.interpretation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tcm" className="mt-6 space-y-6">
            {/* TCM Overview Card */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {result.data.tcm_analysis?.section_title || 'Eastern Wisdom (TCM View)'}
                </h3>
              </div>

              {/* Findings */}
              <div className="flex flex-col gap-4">
                {result.data.tcm_analysis?.findings?.map((finding, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl border-l-4 bg-white shadow-sm"
                    style={{ borderLeftColor: '#a855f7' }}
                  >
                    <h4 className="font-semibold text-[15px] text-purple-900 mb-2">{finding.title}</h4>
                    <p
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: finding.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* TCM Zones Card */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {result.data.tcm_analysis?.zoning_analysis?.title}
                </h3>
              </div>

              {/* Zones */}
              <div className="flex flex-col gap-6">
                {result.data.tcm_analysis?.zoning_analysis?.zones?.map((zone, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl border-l-4 bg-white shadow-sm hover:transform hover:-translate-y-1 transition-transform duration-200 shadow-sm"
                    style={{ borderLeftColor: '#a855f7' }}
                  >
                    <h4 className="font-semibold text-[15px] text-purple-900 mb-2">
                      {zone.zone}
                    </h4>
                    <p
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: zone.finding.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>



          <TabsContent value="care" className="mt-6 space-y-6">
            {/* Tips / Supportive Observations */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {result.data.tips_recommendations?.section_title}
              </h3>

              <div className="space-y-3">
                {result.data.tips_recommendations?.tips?.map((tip, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl flex items-start gap-3"
                    style={{ backgroundColor: '#f0f3ea' }}
                  >
                    <span className="text-sm text-gray-800">{tip.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Summary */}
            <div
              className={`p-5 rounded-2xl border-l-4 text-center ${result.data.health_summary?.clearance_note?.type === 'clearance'
                ? 'bg-green-50 border-green-500 text-green-800'
                : result.data.health_summary?.clearance_note?.type === 'caution'
                  ? 'bg-yellow-50 border-yellow-500 text-yellow-800'
                  : 'bg-red-50 border-red-500 text-red-800'
                }`}
            >
              <p className="text-lg font-medium leading-relaxed">
                {result.data.health_summary?.clearance_note?.text}
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 p-4 rounded-xl text-center">
              <p className="text-orange-800 text-sm leading-relaxed">
                {result.data.disclaimer}
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
          <TabsList className="grid w-full grid-cols-3 bg-gray-50 border-b border-gray-200">
            <TabsTrigger
              value="health"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#113811]"
              style={{ color: '#294829' }}
            >
              <span className="hidden sm:inline">Health Signals</span>
              <span className="sm:hidden">Health</span>
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

          {/* Health Signals Tab */}
          <TabsContent value="health" className="mt-6 space-y-6">
            {/* Banner */}
            <div
              className={`bg-gradient-to-r ${bannerStyle.from} ${bannerStyle.to} p-5 rounded-2xl border-l-4 ${bannerStyle.border} text-center`}
            >
              <p className={`${bannerStyle.text} text-lg font-medium leading-relaxed`}>
                {result.bannerText}
              </p>
            </div>

            <div
              className="p-6 rounded-2xl border-l-4 bg-purple-50 border-purple-500"
              role="region"
              aria-label="Handwriting Characteristics"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {result.data.neurological_analysis?.section_title}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {result.data.neurological_analysis?.items?.map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border-l-4 hover:transform hover:-translate-y-1 transition-transform duration-200 shadow-sm"
                    style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }}
                  >
                    <h4 className="font-semibold mb-2 text-[15px]" style={{ color: '#2d4c2b' }}>
                      {item.title}
                    </h4>

                    <p
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: item.observation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />                    <br />
                    <p
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: item.interpretation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />

                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Personality Tab */}
          <TabsContent value="personality" className="mt-6 space-y-6">
            {/* Personality Section Header */}

            <h4>{result.data.personality_analysis?.section_title} </h4>

            {/* Personality Items */}
            <div className="grid grid-cols-1 gap-4">
              {result.data.personality_analysis?.items?.map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl border-l-4 shadow-sm transition-transform duration-200 hover:-translate-y-1"
                  style={{ backgroundColor: '#fdf6ed', borderLeftColor: '#dd6b20' }}
                >
                  <h4 className="font-semibold text-[15px] mb-2 text-[#7b341e]">
                    {item.title}
                  </h4>
                  <div className="text-sm text-[#652b19] mb-1">
                    <strong>What we see:</strong> {item.observation}
                  </div>
                  <div className="text-sm text-gray-800">
                    <strong>Interpretation:</strong>{' '}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.interpretation.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong>$1</strong>'
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Traits Highlight */}
            {result.data.personality_analysis?.traits_highlight?.traits?.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border-l-4 border-orange-400">
                <h4 className="text-orange-800 text-lg font-semibold mb-2">
                  {result.data.personality_analysis?.traits_highlight?.title || 'Traits'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.data.personality_analysis.traits_highlight.traits.map(
                    (trait, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            {result.data.disclaimer && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 p-4 rounded-xl text-center">
                <p className="text-orange-800 text-sm leading-relaxed">
                  {result.data.disclaimer}
                </p>
              </div>
            )}
          </TabsContent>


          {/* Tips Tab */}
          <TabsContent value="tips" className="mt-6 space-y-6">
            <div
              className="p-6 rounded-2xl border-l-4 bg-blue-50 border-blue-500"
              role="region"
              aria-label="Supportive Observations"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {result.data.supportive_observations?.section_title || 'Supportive Observations'}
              </h3>

              <div className="space-y-3">
                {result.data.supportive_observations?.items?.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border-l-3 flex items-start gap-3"
                    style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }}
                  >

                    <span className="text-sm text-[#022406]"><strong>{item.title}: </strong>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.data.supportive_observations?.summary && (
              <div
                className="p-5 rounded-2xl border-l-4 text-center bg-gradient-to-r from-green-50 to-green-100 border-green-500 space-y-2"
                role="region"
                aria-label="Summary Section"
              >
                <h4 className="text-green-900 text-xl font-semibold">
                  {result.data.supportive_observations.summary.title}
                </h4>
                <p className="text-green-800 text-base leading-relaxed">
                  {result.data.supportive_observations.summary.text}
                </p>
                <p className="text-green-900 text-base font-medium leading-relaxed">
                  {result.data.supportive_observations.summary.conclusion}
                </p>
              </div>
            )}

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
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {result.data.nail_health_check?.section_title || 'Nail Plate Assessment'}
                </h3>

                <div className="flex flex-col gap-4">
                  {result.data.nail_health_check?.findings?.map((finding, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl border-l-4 shadow-sm transition-transform duration-200 hover:-translate-y-1"
                      style={{
                        backgroundColor: '#f0f3ea',
                        borderLeftColor: '#123c14',
                      }}
                    >
                      <h4 className="font-semibold mb-2 text-[15px]" style={{ color: '#2d4c2b' }}>
                        {finding.title}
                      </h4>
                      <p
                        className="text-sm text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: finding.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>



          <TabsContent value="circulation" className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {result.data.deeper_analysis?.section_title || 'Detailed Nail Analysis'}
              </h3>

              <p className="text-gray-700 text-sm mb-6">
                {result.data.deeper_analysis?.description}
              </p>

              <div className="flex flex-col gap-4">
                {result.data.deeper_analysis?.findings?.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl border-l-4 transition-transform duration-200 hover:-translate-y-1 shadow-sm"
                    style={{
                      backgroundColor: '#f0f3ea',
                      borderLeftColor: '#123c14',
                    }}
                  >
                    <h4 className="font-semibold mb-2 text-[15px]" style={{ color: '#2d4c2b' }}>
                      {item.title}
                    </h4>

                    <p className="text-sm mb-4" style={{ color: '#022406' }}>
                      {item.observation}
                    </p>

                    <Tabs defaultValue="allopathic" className="w-full">
                      <TabsList className="bg-[#e2e8d8] rounded-full p-1 mb-3">
                        <TabsTrigger
                          value="allopathic"
                          className="text-sm px-3 py-1 data-[state=active]:bg-white data-[state=active]:text-[#123c14]"
                        >
                          Allopathic
                        </TabsTrigger>
                        <TabsTrigger
                          value="functional_tcm"
                          className="text-sm px-3 py-1 data-[state=active]:bg-white data-[state=active]:text-[#123c14]"
                        >
                          TCM
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="allopathic">
                        <p
                          className="text-sm text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: item.interpretation.allopathic.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                          }}
                        />
                      </TabsContent>

                      <TabsContent value="functional_tcm">
                        <p
                          className="text-sm text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: item.interpretation.functional_tcm.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                          }}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>


          <TabsContent value="recommendations" className="mt-6 space-y-6">
            {/* Celebration Summary */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-2xl border-l-4 border-green-500 text-center">
              <p className="text-green-800 text-lg font-medium leading-relaxed">
                {result.data.supportive_observations?.celebration_message}
              </p>
            </div>

            {/* Supportive Observations */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {result.data.supportive_observations?.section_title}
              </h3>

              <div className="flex flex-col gap-4">
                {result.data.supportive_observations?.observations?.map((obs, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border-l-3"
                    style={{ backgroundColor: '#f0f3ea', borderLeftColor: '#123c14' }}
                  >
                    <h4 className="font-semibold mb-2 text-[15px]" style={{ color: '#2d4c2b' }}>
                      {obs.title}
                    </h4>
                    <p className="text-sm" style={{ color: '#022406' }}>
                      {obs.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-500 p-4 rounded-2xl text-center">
              <p className="text-orange-800 text-sm leading-relaxed">
                {result.data.disclaimer}
              </p>
            </div>
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

  console.log("result: ", result);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl h-full max-h-screen md:max-h-[90vh] overflow-y-auto p-0 md:p-6 rounded-2xl">
        <DialogHeader className="border-b pb-3 md:pb-4 px-6 py-5 md:p-0 rounded-t-2xl relative" style={{ backgroundColor: '#2d4b2c' }}>
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-3 md:gap-0 pl-2.5">
            <div className="flex items-start md:items-center gap-2 md:gap-3 w-full md:w-auto">
              <div className="flex-1 md:flex-none">
                <DialogTitle className="text-xl md:text-2xl font-bold leading-tight flex items-center gap-2 mb-2 text-white">
                  {result.type === 'eye' && <Eye className="h-6 w-6" />}
                  {result.type === 'nail' && <Hand className="h-6 w-6" />}
                  {result.type === 'tongue' && <Heart className="h-6 w-6" />}
                  {result.type === 'handwriting' && <User className="h-6 w-6" />}
                  {result.title}
                </DialogTitle>

                <p className="text-white/90 text-sm md:text-base mb-4">
                  {result.description}
                </p>
                <div className="flex items-start md:items-center gap-3 flex-col md:flex-row">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm text-white">
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColorClass(result.statusColor)}`} />
                    <span>{result.statusBadge}</span>
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

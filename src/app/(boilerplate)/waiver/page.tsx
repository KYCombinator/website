import { AlertTriangle, Camera, Scale } from "lucide-react"

export default function WaiverPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Legal Agreements</h1>

          {/* Liability Waiver Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Release and Waiver of Liability</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                I, for myself and on behalf of my heirs and personal representatives, hereby <span className="font-semibold">RELEASE AND HOLD HARMLESS</span> KYC / Story / HackKentucky, its officers, employees, volunteers, sponsors, and agents (&quot;Releasees&quot;) from any and all claims, injuries, damages, losses or expenses I may suffer, <span className="font-semibold">WHETHER ARISING FROM NEGLIGENCE OR OTHERWISE</span>, to the fullest extent permitted by law.
              </p>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800">
                  This waiver does not apply to claims arising from gross negligence or willful misconduct of the Releasees.
                </p>
              </div>
            </div>
          </div>

          {/* Media Consent Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Media Consent Agreement</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                By attending and/or submitting media to KYC / Story / HackKentucky I agree to the following:
              </p>
              
              <p className="text-lg">
                I authorize KYC / Story / HackKentucky to use, reproduce, and distribute any media (photos, videos, or audio) captured of me at the event or submitted by me. This includes, but is not limited to, promotional, educational, social media, print, or web content without restriction or compensation. I understand that my consent is granted indefinitely unless I withdraw it in writing.
              </p>
            </div>
          </div>

          {/* Electronic Signature Notice */}
          <div className="bg-blue-50 rounded-lg p-6 flex gap-4">
            <AlertTriangle className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <p className="text-blue-800">
              This waiver was last updated on March 1st, 2025 at 12:00 PM EST.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
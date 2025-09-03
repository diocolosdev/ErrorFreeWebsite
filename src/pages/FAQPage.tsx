@@ .. @@
 import React, { useState } from 'react';
 import { Helmet } from 'react-helmet-async';
-import { ChevronDown, ChevronUp } from 'lucide-react';
+import { ChevronDown, ChevronUp, Phone, MessageSquare, Mail } from 'lucide-react';
 
 const FAQPage = () => {
   const [openIndex, setOpenIndex] = useState<number | null>(0);
@@ -108,6 +108,42 @@
           </div>
         </div>
 
+        {/* Contact Section */}
+        <div className="mt-16 bg-blue-50 rounded-2xl p-8">
+          <h3 className="text-2xl font-bold text-blue-900 text-center mb-6">Still Have Questions?</h3>
+          <p className="text-blue-800 text-center mb-8">
+            Our friendly support team is available 24/7 to help with any questions you might have.
+          </p>
+          
+          <div className="grid md:grid-cols-3 gap-6">
+            <a
+              href="tel:07745432478"
+              className="flex flex-col items-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
+            >
+              <Phone className="w-12 h-12 text-red-600 mb-4" />
+              <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
+              <p className="text-gray-600 text-center">07745432478</p>
+              <p className="text-sm text-gray-500">24/7 Emergency Line</p>
+            </a>
+            
+            <a
+              href="https://wa.me/4407745432478"
+              className="flex flex-col items-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
+            >
+              <MessageSquare className="w-12 h-12 text-green-600 mb-4" />
+              <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
+              <p className="text-gray-600 text-center">Live Chat</p>
+              <p className="text-sm text-gray-500">Instant Response</p>
+            </a>
+            
+            <a
+              href="mailto:support@errorfree247.co.uk"
+              className="flex flex-col items-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
+            >
+              <Mail className="w-12 h-12 text-blue-600 mb-4" />
+              <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
+              <p className="text-gray-600 text-center">support@errorfree247.co.uk</p>
+              <p className="text-sm text-gray-500">Detailed Support</p>
+            </a>
+          </div>
+        </div>
       </div>
     </section>
   );
 };
 
 export default FAQPage;
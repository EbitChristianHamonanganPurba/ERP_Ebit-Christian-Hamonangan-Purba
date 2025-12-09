
import React, { useState } from 'react';
import { extractDataFromInvoice } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';

const TransactionView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonResult, setJsonResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setJsonResult(null);
      setError(null);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProcessInvoice = async () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setJsonResult(null);

    try {
      const base64Image = await fileToBase64(selectedFile);
      const mimeType = selectedFile.type;
      const result = await extractDataFromInvoice(base64Image, mimeType);
      
      const cleanedResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Try to parse and stringify to format it nicely
      try {
        const parsedJson = JSON.parse(cleanedResult);
        setJsonResult(JSON.stringify(parsedJson, null, 2));
      } catch (parseError) {
        // If parsing fails, just show the raw (but cleaned) text
        setJsonResult(cleanedResult);
      }

    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ekstraksi Data Faktur Otomatis</h3>
      <p className="text-sm text-gray-600 mb-6">Unggah gambar faktur atau surat jalan. AI akan membaca dan mengonversinya menjadi format JSON.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Unggah Gambar
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Unggah file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                </label>
                <p className="pl-1">atau seret dan lepas</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
            </div>
          </div>
          
          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Pratinjau:</p>
              <img src={previewUrl} alt="Preview" className="mt-2 rounded-md max-h-48 border" />
            </div>
          )}

          <button
            onClick={handleProcessInvoice}
            disabled={!selectedFile || isLoading}
            className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Memproses...' : 'Proses Faktur'}
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Hasil JSON</h4>
            <div className="w-full h-96 bg-gray-900 text-white p-4 rounded-md overflow-auto font-mono text-sm">
                {isLoading && <p>Menganalisis gambar...</p>}
                {error && <p className="text-red-400">Error: {error}</p>}
                {jsonResult && <pre><code>{jsonResult}</code></pre>}
                {!isLoading && !error && !jsonResult && <p className="text-gray-400">Hasil akan ditampilkan di sini.</p>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionView;

import { saveAs } from 'file-saver';
import { ExportOptions } from '../ambigram/types';

export class FileExporter {
  /**
   * Export PNG format
   */
  async exportPNG(svg: string, options: ExportOptions = {}): Promise<void> {
    const {
      resolution = 1024,
      transparent = true,
      quality = 0.9
    } = options;

    try {
      // Create canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Unable to create canvas context');

      // Set canvas dimensions
      canvas.width = resolution;
      canvas.height = resolution / 2; // Ambigrams typically have 2:1 aspect ratio

      // Fill white background if transparency not needed
      if (!transparent) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Create Image object to load SVG
      const img = new Image();
      const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Draw SVG to canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, `ambigram-${Date.now()}.png`);
          }
        }, 'image/png', quality);
        
        // Clean up URL
        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        throw new Error('SVG loading failed');
      };

      img.src = url;
    } catch (error) {
      console.error('PNG export failed:', error);
      throw error;
    }
  }

  /**
   * Export SVG format
   */
  async exportSVG(svg: string): Promise<void> {
    try {
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      saveAs(blob, `ambigram-${Date.now()}.svg`);
    } catch (error) {
      console.error('SVG export failed:', error);
      throw error;
    }
  }

  /**
   * Export PDF format
   * Using simplified method: convert SVG to image then embed in PDF
   */
  async exportPDF(svg: string, options: ExportOptions = {}): Promise<void> {
    try {
      // First create high-resolution PNG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Unable to create canvas context');

      // Set high resolution for PDF
      const resolution = options.resolution || 2048;
      canvas.width = resolution;
      canvas.height = resolution / 2;

      // White background (usually needed for PDF)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/png', 0.95);

        // Create simple PDF content
        const pdfContent = this.createSimplePDF(dataUrl, canvas.width, canvas.height);
        const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
        saveAs(pdfBlob, `ambigram-${Date.now()}.pdf`);
        
        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        throw new Error('SVG loading failed');
      };

      img.src = url;
    } catch (error) {
      console.error('PDF export failed:', error);
      throw error;
    }
  }

  /**
   * Create simple PDF content
   * Note: This is a simplified PDF generation, recommend using professional PDF library like jsPDF in production
   */
  private createSimplePDF(imageDataUrl: string, width: number, height: number): string {
    // Return a basic PDF structure here
    // Should use professional PDF generation library in actual implementation
    const pdfHeader = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 ${width} ${height}]
/Contents 4 0 R
/Resources <<
  /XObject <<
    /Im1 5 0 R
  >>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
q
${width} 0 0 ${height} 0 0 cm
/Im1 Do
Q
endstream
endobj

5 0 obj
<<
/Type /XObject
/Subtype /Image
/Width ${width}
/Height ${height}
/ColorSpace /DeviceRGB
/BitsPerComponent 8
/Filter /DCTDecode
/Length ${imageDataUrl.length}
>>
stream
${imageDataUrl}
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
${500 + imageDataUrl.length}
%%EOF`;

    return pdfHeader;
  }

  /**
   * Export tattoo template (black and white line version)
   */
  async exportTattooTemplate(svg: string, options: ExportOptions = {}): Promise<void> {
    try {
      // Convert SVG to black and white line version
      const templateSvg = this.convertToTattooTemplate(svg);

      // Export as high-resolution PNG
      await this.exportPNG(templateSvg, {
        ...options,
        resolution: options.resolution || 2048,
        transparent: false // Tattoo templates usually need white background
      });
    } catch (error) {
      console.error('Tattoo template export failed:', error);
      throw error;
    }
  }

  /**
   * Convert SVG to tattoo template style
   */
  private convertToTattooTemplate(svg: string): string {
    // Remove fill colors, keep only outlines
    let templateSvg = svg
      .replace(/fill="[^"]*"/g, 'fill="none"')
      .replace(/stroke="[^"]*"/g, 'stroke="#000000"')
      .replace(/stroke-width="[^"]*"/g, 'stroke-width="2"');
    
    // Add default black outline if no stroke attribute
    if (!templateSvg.includes('stroke=')) {
      templateSvg = templateSvg.replace(/<text/g, '<text stroke="#000000" stroke-width="1" fill="none"');
    }
    
    return templateSvg;
  }

  /**
   * Batch export multiple formats
   */
  async exportAll(svg: string, options: ExportOptions = {}): Promise<void> {
    try {
      await Promise.all([
        this.exportPNG(svg, options),
        this.exportSVG(svg),
        this.exportPDF(svg, options)
      ]);
    } catch (error) {
      console.error('Batch export failed:', error);
      throw error;
    }
  }

  /**
   * Get supported export formats
   */
  getSupportedFormats(): Array<{ value: string; label: string; description: string }> {
    return [
      {
        value: 'png',
        label: 'PNG Image',
        description: 'Suitable for web sharing and preview, supports transparent background'
      },
      {
        value: 'svg',
        label: 'SVG Vector',
        description: 'Lossless scaling, suitable for professional design and printing'
      },
      {
        value: 'pdf',
        label: 'PDF Document',
        description: 'Suitable for printing and professional use'
      },
      {
        value: 'tattoo',
        label: 'Tattoo Template',
        description: 'Black and white line version, optimized for tattoo artists'
      }
    ];
  }
}
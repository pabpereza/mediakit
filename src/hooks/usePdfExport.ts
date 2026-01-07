import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const usePdfExport = () => {
  const exportToPdf = async () => {
    const element = document.getElementById('mediakit-content');
    if (!element) {
      console.error('No se encontró el elemento mediakit-content');
      return;
    }

    try {
      // Show loading state
      const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
      const originalText = button?.innerText;
      if (button) {
        button.innerText = 'Generando PDF...';
        button.disabled = true;
      }

      // Capture the element as canvas
      const canvas = await html2canvas(element, {
        scale: 1.5, // Reduced scale for smaller file size (was 2)
        useCORS: true,
        logging: false,
        backgroundColor: '#020617', // slate-950
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          // Hide elements that shouldn't be in the PDF
          const hiddenElements = clonedDoc.querySelectorAll('.print\\:hidden, [data-pdf-hide]');
          hiddenElements.forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });
          
          // Remove blur effects that don't render well
          const blurElements = clonedDoc.querySelectorAll('[class*="blur-"]');
          blurElements.forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });

          // Fix gradient text for h1 and headings - convert to solid color
          const gradientTexts = clonedDoc.querySelectorAll('.text-transparent.bg-clip-text, [class*="bg-clip-text"]');
          gradientTexts.forEach(el => {
            const element = el as HTMLElement;
            // Remove transparency and use solid emerald color
            element.style.color = '#34d399'; // emerald-400
            element.style.webkitTextFillColor = '#34d399';
            element.style.backgroundImage = 'none';
            element.style.webkitBackgroundClip = 'unset';
            element.style.backgroundClip = 'unset';
          });

          // Ensure all h1, h2, h3 text is visible
          const headings = clonedDoc.querySelectorAll('h1, h2, h3, h4');
          headings.forEach(el => {
            const element = el as HTMLElement;
            if (getComputedStyle(element).color === 'transparent' || 
                getComputedStyle(element).webkitTextFillColor === 'transparent') {
              element.style.color = '#ffffff';
              element.style.webkitTextFillColor = '#ffffff';
            }
          });
        }
      });

      // Use JPEG with compression for smaller file size (target 5-10MB)
      const imgData = canvas.toDataURL('image/jpeg', 0.85); // 85% quality JPEG
      
      // Calculate PDF dimensions - single page with custom height
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF with custom page size to fit all content in one page
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [imgWidth, imgHeight], // Custom size: A4 width, dynamic height
        compress: true // Enable compression
      });

      // Add single page with all content
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'MEDIUM');

      // Download the PDF
      pdf.save('pabpereza-mediakit.pdf');

      // Restore button state
      if (button) {
        button.innerText = originalText || './download-report.pdf';
        button.disabled = false;
      }
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Intenta usar la opción de imprimir del navegador.');
    }
  };

  return { exportToPdf };
};

import { useState } from "react";
import SwipePanel from "./SwipePanel";
import { CheckCircle, Download, ExternalLink } from "lucide-react";
import certifications from "../data/certifications.json";

type Cert = typeof certifications[0];

const CertificationsSection = () => {
  const [selected, setSelected] = useState<Cert | null>(null);

  return (
    <section id="certifications" className="min-h-screen py-24 px-6 md:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-10 flex items-center gap-3">
          CERTIFIED <CheckCircle className="text-accent" size={32} />
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((c, i) => {
            const pdfUrl = (c as { pdfUrl?: string }).pdfUrl;
            return (
              <div
                key={c.credentialId}
                onClick={() => setSelected(c)}
                className="cursor-pointer group"
                style={{ animation: `cert-fade-in 0.4s ease-out ${i * 0.08}s both` }}
              >
                <div className="relative aspect-[3/4] bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-accent/50">

                  {/* ── PDF preview or letter fallback ── */}
                  {pdfUrl ? (
                    <iframe
                      src={`${pdfUrl}#toolbar=0&view=FitH`}
                      title={c.name}
                      style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none", display: "block" }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                        <span className="font-display text-lg text-muted-foreground">{c.issuer.charAt(0)}</span>
                      </div>
                      <p className="font-body text-[9px] text-accent tracking-wide mb-2 leading-tight">{c.issuer}</p>
                      <h4 className="font-body text-xs font-semibold text-foreground leading-tight">{c.name}</h4>
                      <p className="font-body text-[10px] text-muted-foreground mt-2">{c.issueDate}</p>
                    </div>
                  )}

                  {/* Verified stamp */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-accent/20 text-accent text-[8px] font-body tracking-wider uppercase rounded rotate-12">Verified</span>

                  {/* Hover overlay — unchanged */}
                  <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="font-body text-xs text-accent-foreground tracking-wider">View Certificate</span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SwipePanel open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="text-center">
            <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
              <span className="font-display text-4xl text-muted-foreground">{selected.issuer.charAt(0)}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-2">{selected.name}</h2>
            <p className="font-body text-muted-foreground mb-1">{selected.issuer}</p>
            <p className="font-body text-xs text-muted-foreground mb-6">Credential ID: {selected.credentialId}</p>

            {/* PDF Display */}
            {"pdfUrl" in selected && selected.pdfUrl && (
              <div className="mb-8 rounded-lg overflow-hidden border border-border bg-card">
                <iframe
                  src={selected.pdfUrl}
                  className="w-full h-96"
                  title={selected.name}
                />
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {selected.skills.map((s) => (
                <span key={s} className="px-3 py-1 bg-secondary text-muted-foreground text-xs font-body rounded-full">{s}</span>
              ))}
            </div>

            {"pdfUrl" in selected && selected.pdfUrl ? (
              <a href={selected.pdfUrl} download className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-body text-sm rounded hover:brightness-110 transition-all">
                <Download size={16} /> Download Certificate
              </a>
            ) : (
              <a href={selected.verifyUrl || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-body text-sm rounded hover:brightness-110 transition-all">
                <ExternalLink size={16} /> Verify Certificate
              </a>
            )}
          </div>
        )}
      </SwipePanel>
    </section>
  );
};

export default CertificationsSection;

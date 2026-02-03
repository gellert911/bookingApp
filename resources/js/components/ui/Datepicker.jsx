import React, { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

import { TempusDominus, DateTime } from '@eonasdan/tempus-dominus';
import "@eonasdan/tempus-dominus/dist/css/tempus-dominus.min.css";

const Datepicker = forwardRef(function Datepicker({ value, onChange, mode = "input" }, ref) {
    const inputRef = useRef(null);
    const pickerRef = useRef(null);

    const now = new Date();

    useEffect(() => {
        pickerRef.current = new TempusDominus(inputRef.current, {
            defaultDate: now,
            localization: {
                format: "yyyy-MM-dd",
            },

            display: {
                components: {
                    year: false,
                    decades: false,
                    clock: false,
                    hours: false,
                    minutes: false,
                }
            },

            restrictions: {
                minDate: now,
            }
        })

        pickerRef.current.subscribe("change.td", (e) => {
            onChange(e.date)
        })

        return () => {
            pickerRef.current.dispose();
        }
    }, [])

    useImperativeHandle(ref, () => ({
        shiftDays(days) {
            const picker = pickerRef.current;
            const last = picker.dates.lastPicked;

            if (!last) return;

            const d = DateTime.convert(new Date(last.getTime()));

            d.setDate(d.getDate() + days);

            picker.dates.setValue(d)
        }
    }))

    return (
        <>
            {(mode === "input") && (
                <input ref={inputRef} className='form-control'/>
            )}

            {(mode === "icon") && (
                <button ref={inputRef} className='btn btn-lg align-items-center'>
                    <i className="fa-regular fa-calendar"></i>
                </button>
            )}
        </>
    )
})

export default Datepicker;